import { describe, test, expect, jest, beforeEach, beforeAll, afterAll } from '@jest/globals'
import { dialog } from 'electron'
import fs from 'fs'
import * as contentFile from '@main/helpers/contentFile'
import * as dialogConfirm from '@main/helpers/dialogs/dialogConfirm'

describe('contentFile', () => {
  beforeEach(() => {
    contentFile.getFileContent().name = ''
    contentFile.getFileContent().content = ''
    contentFile.getFileContent().saved = false
    contentFile.getFileContent().currentSaved = false
    contentFile.getFileContent().filePath = 'tests\\mocks\\Sem titulo'
  })

  beforeAll(() => {
    const files = fs.readdirSync('tests/mocks/')
    files.forEach((file) => fs.rmSync(`tests/mocks/${file}`))
    fs.writeFileSync('tests/mocks/fileExisting.txt', 'Arquivo existente', { encoding: 'utf-8' })
  })

  afterAll(() => {
    const files = fs.readdirSync('tests/mocks/')
    files.forEach((file) => fs.rmSync(`tests/mocks/${file}`))
  })

  describe('Criar novo arquivo', () => {
    test('conteúdo resetado após criação do novo arquivo', async () => {
      jest.spyOn(dialogConfirm, 'dialogSaveFile').mockResolvedValueOnce(true)

      contentFile.getFileContent().content = 'Conteúdo'
      await contentFile.newFile(global.mainWindow)

      expect(contentFile.getFileContent()).toEqual({
        name: '',
        content: '',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('conteúdo não resetado após não salvamento do arquivo', async () => {
      jest.spyOn(dialogConfirm, 'dialogSaveFile').mockResolvedValueOnce(false)

      contentFile.getFileContent().content = 'Conteúdo'
      await contentFile.newFile(global.mainWindow)

      expect(contentFile.getFileContent()).toEqual({
        name: '',
        content: 'Conteúdo',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })
  })

  describe('Abrir arquivo', () => {
    test('Conteúdo carregado de um arquivo aberto', async () => {
      jest.spyOn(dialogConfirm, 'dialogSaveFile').mockResolvedValueOnce(true)
      jest.spyOn(dialog, 'showOpenDialog').mockResolvedValueOnce({
        canceled: false,
        filePaths: ['tests/mocks/fileExisting.txt']
      })

      await contentFile.openFile(global.mainWindow)

      expect(contentFile.getFileContent()).toEqual({
        name: 'fileExisting.txt',
        content: 'Arquivo existente',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileExisting.txt'
      })
    })

    test('Conteúdo não carregado após usuário cancelar abertura do arquivo', async () => {
      jest.spyOn(dialogConfirm, 'dialogSaveFile').mockResolvedValueOnce(true)
      jest.spyOn(dialog, 'showOpenDialog').mockResolvedValueOnce({
        canceled: true,
        filePaths: []
      })

      await contentFile.openFile(global.mainWindow)

      expect(contentFile.getFileContent()).toEqual({
        name: '',
        content: '',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })
  })

  describe('Salvar arquivo', () => {
    test('salvar como em um novo arquivo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/fileSave.txt'
      })

      contentFile.getFileContent().content = 'Salvar conteúdo como'
      const res = await contentFile.saveFile(global.mainWindow, true)

      expect(res).toEqual(true)
      expect(contentFile.getFileContent()).toEqual({
        name: 'fileSave.txt',
        content: 'Salvar conteúdo como',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileSave.txt'
      })
    })

    test('conteúdo não resetado após usuário cancelar salvar como', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: true,
        filePath: ''
      })

      contentFile.getFileContent().content = 'Salvar conteúdo como'
      const res = await contentFile.saveFile(global.mainWindow, true)

      expect(res).toEqual(false)
      expect(contentFile.getFileContent()).toEqual({
        name: '',
        content: 'Salvar conteúdo como',
        saved: false,
        currentSaved: false,
        filePath: 'tests\\mocks\\Sem titulo'
      })
    })

    test('salvar como em um novo arquivo com conteúdo de outro arquivo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/saveAsFileExisting.txt'
      })

      contentFile.getFileContent().content = 'Como salvar conteúdo em outro arquivo'
      contentFile.getFileContent().saved = true
      contentFile.getFileContent().currentSaved = true
      contentFile.getFileContent().filePath = 'tests/mocks/fileSave.txt'
      const res = await contentFile.saveFile(global.mainWindow, true)

      expect(res).toEqual(true)
      expect(contentFile.getFileContent()).toEqual({
        name: 'saveAsFileExisting.txt',
        content: 'Como salvar conteúdo em outro arquivo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/saveAsFileExisting.txt'
      })
    })

    test('salvar novo conteúdo de um arquivo aberto', async () => {
      contentFile.getFileContent().saved = true
      contentFile.getFileContent().currentSaved = false
      contentFile.getFileContent().content = 'Salvar novo conteúdo'
      contentFile.getFileContent().filePath = 'tests/mocks/fileSave.txt'
      const res = await contentFile.saveFile(global.mainWindow, false)

      expect(res).toEqual(true)
      expect(contentFile.getFileContent()).toEqual({
        name: 'fileSave.txt',
        content: 'Salvar novo conteúdo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/fileSave.txt'
      })
    })

    test('salvar novo conteúdo em um novo arquivo', async () => {
      jest.spyOn(dialog, 'showSaveDialog').mockResolvedValueOnce({
        canceled: false,
        filePath: 'tests/mocks/newFileSave.txt'
      })

      contentFile.getFileContent().content = 'Salvar novo conteúdo em um novo arquivo'
      const res = await contentFile.saveFile(global.mainWindow, false)

      expect(res).toEqual(true)
      expect(contentFile.getFileContent()).toEqual({
        name: 'newFileSave.txt',
        content: 'Salvar novo conteúdo em um novo arquivo',
        saved: true,
        currentSaved: true,
        filePath: 'tests/mocks/newFileSave.txt'
      })
    })
  })
})
