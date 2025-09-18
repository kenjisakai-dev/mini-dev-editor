const { dialog } = require("electron");
const fs = require("fs");

jest.mock("electron", () => ({
  app: {
    getPath: jest.fn(() => "tests/mocks"),
  },
  ipcMain: {
    on: jest.fn(),
  },
  dialog: {
    showOpenDialog: jest.fn(),
    showSaveDialog: jest.fn(),
  },
}));

jest.mock("electron-store", () => {
  return {
    default: function () {
      return {
        get: jest.fn(() => "javascript"),
        set: jest.fn(),
      };
    },
  };
});

describe("contentFile", () => {
  let contentFile;
  let win = {
    webContents: {
      send: jest.fn(),
    },
  };

  const clearMocks = () => {
    const filepathSave = "./tests/mocks/save.txt";
    fs.rmSync(filepathSave, { force: true });
  };

  beforeEach(() => {
    contentFile = require("../../src/helpers/contentFile");
    clearMocks();
  });

  afterAll(() => {
    clearMocks();
  });

  test("criar um novo arquivo", () => {
    contentFile.newFile(win);

    expect(contentFile.fileContent()).toEqual({
      name: "",
      content: "",
      saved: false,
      currentSaved: false,
      path: "tests\\mocks\\Sem titulo",
    });
  });

  test("Abrir um arquivo existente", async () => {
    jest.spyOn(dialog, "showOpenDialog").mockResolvedValueOnce({
      canceled: false,
      filePaths: ["tests/mocks/arquivoExistente.txt"],
    });

    await contentFile.openFile(win);

    expect(contentFile.fileContent()).toEqual({
      name: "arquivoExistente.txt",
      content: "Conteúdo do arquivo de teste",
      saved: true,
      currentSaved: true,
      path: "tests/mocks/arquivoExistente.txt",
    });
  });

  test("Cancelar abertura de arquivo", async () => {
    jest.spyOn(dialog, "showOpenDialog").mockResolvedValueOnce({
      canceled: true,
      filePaths: [],
    });

    const res = await contentFile.openFile(win);

    expect(res).toEqual(false);
  });

  test("Salvar como em um novo arquivo", async () => {
    contentFile.newFile(win);
    contentFile.fileContent().content = "Conteúdo do arquivo de teste";
    jest.spyOn(dialog, "showSaveDialog").mockResolvedValueOnce({
      canceled: false,
      filePath: "tests/mocks/save.txt",
    });

    const res = await contentFile.saveFile(win, true);

    expect(res).toEqual(true);
    expect(contentFile.fileContent()).toEqual({
      name: "save.txt",
      content: "Conteúdo do arquivo de teste",
      saved: true,
      currentSaved: true,
      path: "tests/mocks/save.txt",
    });
  });

  test("Salvar em um arquivo já existente", async () => {
    contentFile.newFile(win);
    contentFile.fileContent().content = "Novo conteúdo do arquivo";
    jest.spyOn(dialog, "showSaveDialog").mockResolvedValueOnce({
      canceled: false,
      filePath: "tests/mocks/save.txt",
    });

    const res = await contentFile.saveFile(win, false);

    expect(res).toEqual(true);
    expect(contentFile.fileContent()).toEqual({
      name: "save.txt",
      content: "Novo conteúdo do arquivo",
      saved: true,
      currentSaved: true,
      path: "tests/mocks/save.txt",
    });
  });

  test("Cancelar salvar como em um novo arquivo", async () => {
    jest.spyOn(dialog, "showSaveDialog").mockResolvedValueOnce({
      canceled: true,
      filePath: "",
    });

    const res = await contentFile.saveFile(win, true);

    expect(res).toEqual(false);
  });
});
