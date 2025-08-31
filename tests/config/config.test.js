const fs = require("fs");

describe("config", () => {
  let config;

  beforeEach(() => {
    config = require("../../src/config/config");

    if (fs.existsSync("./tests/mocks/mini-dev-editor-config.json")) {
      fs.unlinkSync("./tests/mocks/mini-dev-editor-config.json");
    }
  });

  afterAll(() => {
    if (fs.existsSync("./tests/mocks/mini-dev-editor-config.json")) {
      fs.unlinkSync("./tests/mocks/mini-dev-editor-config.json");
    }
  });

  test("Configurações de personalização padrão do editor", async () => {
    await config.loadConfigApp();

    expect(config.themeApp()).toBe("system");
    expect(config.themeAppCode()).toBe("material-darker");
    expect(config.colorTextApp()).toBe("cinzaClaro");
    expect(config.fontApp()).toBe("Source Code Pro");
    expect(config.zoomApp()).toBe(1.2);
    expect(config.zoomAppDefault()).toBe(1.2);
    expect(config.editorTypeApp()).toBe("txt");
    expect(config.editorNameApp()).toBe("text");
  });

  test("Mudança de configurações de personalização do editor", async () => {
    config.saveConfigApp({
      themeApp: "dark",
      themeAppCode: "dracula",
      colorTextApp: "amarelo",
      fontApp: "Inter",
      zoomApp: 1.4,
      editorTypeApp: "code",
      editorNameApp: "javascript",
    });
    await config.loadConfigApp();

    expect(config.themeApp()).toBe("dark");
    expect(config.themeAppCode()).toBe("dracula");
    expect(config.colorTextApp()).toBe("amarelo");
    expect(config.fontApp()).toBe("Inter");
    expect(config.zoomApp()).toBe(1.4);
    expect(config.zoomAppDefault()).toBe(1.2);
    expect(config.editorTypeApp()).toBe("code");
    expect(config.editorNameApp()).toBe("javascript");
  });
});
