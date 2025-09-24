import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import * as contentFile from '@main/helpers/contentFile'
import * as dialogConfirm from '@main/helpers/dialogs/dialogConfirm'
import { dialog } from 'electron'

describe('dialogConfirm', () => {
  beforeEach(() => {
    contentFile.getFileContent().name = ''
    contentFile.getFileContent().content = ''
    contentFile.getFileContent().saved = false
    contentFile.getFileContent().currentSaved = false
    contentFile.getFileContent().filePath = 'tests\\mocks\\Sem titulo'

    jest.clearAllMocks()
  })

  describe('dialogConfirmExit', () => {
    test('fechar APP pois não tem conteúdo', async () => {
      contentFile.getFileContent().content = ''

      await dialogConfirm.dialogConfirmExit(global.mainWindow)

      expect(global.mainWindow.destroy).toHaveBeenCalledTimes(1)
    })

    test('fechar APP pois não foi selecionado para salvar o conteúdo', async () => {
      contentFile.getFileContent().content = 'Conteúdo não salvo'
      contentFile.getFileContent().currentSaved = false
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 1
      })

      await dialogConfirm.dialogConfirmExit(global.mainWindow)

      expect(global.mainWindow.destroy).toHaveBeenCalledTimes(1)
    })

    test('fechar APP pois foi salvo o conteúdo', async () => {
      contentFile.getFileContent().content = 'Conteúdo não salvo'
      contentFile.getFileContent().currentSaved = false
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 0
      })
      jest.spyOn(contentFile, 'saveFile').mockResolvedValueOnce(true)

      await dialogConfirm.dialogConfirmExit(global.mainWindow)

      expect(global.mainWindow.destroy).toHaveBeenCalledTimes(1)
    })

    test('não fechar APP pois conteúdo não foi salvo', async () => {
      contentFile.getFileContent().content = 'Conteúdo não salvo'
      contentFile.getFileContent().currentSaved = false
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 0
      })
      jest.spyOn(contentFile, 'saveFile').mockResolvedValueOnce(false)

      await dialogConfirm.dialogConfirmExit(global.mainWindow)

      expect(global.mainWindow.destroy).toHaveBeenCalledTimes(0)
    })
  })

  describe('dialogSaveFile', () => {
    test('não salva arquivo pois o conteúdo não está modificado', async () => {
      contentFile.getFileContent().content = ''

      const res = await dialogConfirm.dialogSaveFile(global.mainWindow)

      expect(res).toStrictEqual(true)
    })

    test('foi selecionado para não salvar o arquivo modificado', async () => {
      contentFile.getFileContent().content = 'Conteúdo modificado'
      contentFile.getFileContent().currentSaved = false
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 1
      })

      const res = await dialogConfirm.dialogSaveFile(global.mainWindow)

      expect(res).toStrictEqual(true)
    })

    test('foi cancelado o salvamento do arquivo modificado', async () => {
      contentFile.getFileContent().content = 'Conteúdo modificado'
      contentFile.getFileContent().currentSaved = false
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 0
      })
      jest.spyOn(contentFile, 'saveFile').mockResolvedValueOnce(false)

      const res = await dialogConfirm.dialogSaveFile(global.mainWindow)

      expect(res).toStrictEqual(false)
    })

    test('arquivo modificado foi salvo', async () => {
      contentFile.getFileContent().content = 'Conteúdo modificado'
      contentFile.getFileContent().currentSaved = false
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 0
      })
      jest.spyOn(contentFile, 'saveFile').mockResolvedValueOnce(true)

      const res = await dialogConfirm.dialogSaveFile(global.mainWindow)

      expect(res).toEqual(true)
    })
  })
})
