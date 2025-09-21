import { newFile, getFileContent, openFile, saveFile } from '@main/helpers/contentFile'
import { describe, test, expect, jest } from '@jest/globals'
import { dialog } from 'electron'
import fs from 'fs'

describe('contentFile', () => {
  describe('Criar novo arquivo', () => {
    test('criar um novo arquivo com conteúdo', async () => {
      // Mock da caixa de diálogo selecionado para salvar conteúdo
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 0
      })

      // Mock da caixa de diálogo selecionado para salvar arquivo
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/fileCreate.txt'
      })

      getFileContent().content = 'Conteúdo do 1° arquivo'
      await newFile(global.mainWindow)

      // Depois de criar o arquivo o conteúdo deve ser resetado
      expect(getFileContent()).toEqual({
        name: '',
        content: '',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('não criar um novo arquivo com conteúdo após não selecionar salvamento', async () => {
      // Mock da caixa de diálogo selecionado para salvar conteúdo
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 0
      })

      // Mock da caixa de diálogo selecionado para não salvar arquivo
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: true,
        filePath: ''
      })

      getFileContent().content = 'Conteúdo'
      await newFile(global.mainWindow)

      // como não criou o arquivo, o conteúdo deve permanecer o mesmo
      expect(getFileContent()).toEqual({
        name: '',
        content: 'Conteúdo',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('não criar um novo arquivo com conteúdo', async () => {
      // Mock da caixa de diálogo selecionado para não salvar conteúdo
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 1
      })

      getFileContent().content = 'Conteúdo'
      await newFile(global.mainWindow)

      // o conteúdo atual não foi selecionado para salvar no arquivo e assim deve ser resetado
      expect(getFileContent()).toEqual({
        name: '',
        content: '',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('não criar um novo arquivo sem conteúdo', async () => {
      getFileContent().content = ''
      await newFile(global.mainWindow)

      // como não existe conteúdo para criar um novo arquivo o conteúdo é zerado mesmo assim
      expect(getFileContent()).toEqual({
        name: '',
        content: '',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })
  })

  describe('Abrir arquivo', () => {
    test('Abrir um arquivo existente com o editor limpo', async () => {
      jest.spyOn(dialog, 'showOpenDialog').mockResolvedValueOnce({
        canceled: false,
        filePaths: ['tests/mocks/fileExisting.txt']
      })

      await openFile(global.mainWindow)

      // conteúdo deve ser substituído pelo conteúdo do arquivo aberto
      expect(getFileContent()).toEqual({
        name: 'fileExisting.txt',
        content: 'Hello World',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileExisting.txt'
      })
    })

    test('Abrir um arquivo existente com o editor contendo conteúdo', async () => {
      // Mock da caixa de diálogo selecionado para não salvar conteúdo
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 1
      })

      jest.spyOn(dialog, 'showOpenDialog').mockResolvedValueOnce({
        canceled: false,
        filePaths: ['tests/mocks/fileExisting.txt']
      })

      getFileContent().content = 'Conteúdo atual do editor'
      await openFile(global.mainWindow)

      // conteúdo deve ser substituído pelo conteúdo do arquivo aberto
      expect(getFileContent()).toEqual({
        name: 'fileExisting.txt',
        content: 'Hello World',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileExisting.txt'
      })
    })

    test('Cancelar abertura de arquivo com o conteúdo atual do editor limpo', async () => {
      jest.spyOn(dialog, 'showOpenDialog').mockResolvedValueOnce({
        canceled: true,
        filePaths: []
      })

      await newFile(global.mainWindow)
      await openFile(global.mainWindow)

      // como cancelou a abertura do arquivo, o conteúdo atual do editor deve permanecer o mesmo
      expect(getFileContent()).toEqual({
        name: '',
        content: '',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('Cancelar abertura de arquivo com o editor contendo conteúdo', async () => {
      // Mock da caixa de diálogo selecionado para não salvar conteúdo
      jest.spyOn(dialog, 'showMessageBox').mockResolvedValueOnce({
        checkboxChecked: false,
        response: 1
      })

      jest.spyOn(dialog, 'showOpenDialog').mockResolvedValueOnce({
        canceled: true,
        filePaths: []
      })

      getFileContent().content = 'Conteúdo atual do editor'
      await openFile(global.mainWindow)

      // como cancelou a abertura do arquivo, o conteúdo atual do editor deve permanecer o mesmo
      expect(getFileContent()).toEqual({
        name: '',
        content: 'Conteúdo atual do editor',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })
  })

  describe('Salvar arquivo', () => {
    test('Salvar como em um novo arquivo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/fileSave.txt'
      })

      await newFile(global.mainWindow)
      getFileContent().content = 'Salvar conteúdo'

      const res = await saveFile(global.mainWindow, true)

      // Arquivo criado com o conteúdo
      expect(fs.existsSync('tests/mocks/fileSave.txt')).toBe(true)
      const fileContent = fs.readFileSync('tests/mocks/fileSave.txt', 'utf-8')
      expect(fileContent).toEqual('Salvar conteúdo')

      // conteúdo do novo arquivo criado
      expect(res).toEqual(true)
      expect(getFileContent()).toEqual({
        name: 'fileSave.txt',
        content: 'Salvar conteúdo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileSave.txt'
      })
    })

    test('Cancelar salvar como em um novo arquivo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: true,
        filePath: ''
      })

      await newFile(global.mainWindow)
      getFileContent().content = 'Salvar conteúdo'

      const res = await saveFile(global.mainWindow, true)

      // mantém apenas o conteúdo texto pois o salvamento foi cancelado
      expect(res).toEqual(false)
      expect(getFileContent()).toEqual({
        name: '',
        content: 'Salvar conteúdo',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('Salvar como um conteúdo de outro arquivo existente', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/saveAsFileExisting.txt'
      })

      getFileContent().content = 'Salvar conteúdo'
      getFileContent().saved = true
      getFileContent().currentSaved = true
      getFileContent().filePath = 'tests/mocks/fileSave.txt'

      const res = await saveFile(global.mainWindow, true)

      // conteúdo de outro arquivo salvo em um novo arquivo
      expect(res).toEqual(true)
      expect(getFileContent()).toEqual({
        name: 'saveAsFileExisting.txt',
        content: 'Salvar conteúdo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/saveAsFileExisting.txt'
      })
    })

    test('salvar novo conteúdo de um arquivo já existente', async () => {
      await newFile(global.mainWindow)
      getFileContent().saved = true
      getFileContent().content = 'Salvar novo conteúdo'
      getFileContent().filePath = 'tests/mocks/fileSave.txt'

      const res = await saveFile(global.mainWindow, false)

      // conteúdo do arquivo existente deve ser substituído
      expect(res).toEqual(true)
      expect(getFileContent()).toEqual({
        name: 'fileSave.txt',
        content: 'Salvar novo conteúdo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileSave.txt'
      })
    })

    test('salvar conteúdo em um novo arquivo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/newFileSave.txt'
      })

      await newFile(global.mainWindow)
      getFileContent().saved = false
      getFileContent().content = 'Salvar conteúdo em um novo arquivo'

      const res = await saveFile(global.mainWindow, false)

      // conteúdo do arquivo existente deve ser substituído
      expect(res).toEqual(true)
      expect(getFileContent()).toEqual({
        name: 'newFileSave.txt',
        content: 'Salvar conteúdo em um novo arquivo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/newFileSave.txt'
      })
    })

    test('Cancelar salvando de um novo conteúdo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: true,
        filePath: ''
      })

      await newFile(global.mainWindow)
      getFileContent().content = 'Salvar conteúdo em um novo arquivo'

      const res = await saveFile(global.mainWindow, true)

      // mantém apenas o conteúdo texto pois o salvamento foi cancelado
      expect(res).toEqual(false)
      expect(getFileContent()).toEqual({
        name: '',
        content: 'Salvar conteúdo em um novo arquivo',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })
  })
})
