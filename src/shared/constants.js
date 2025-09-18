module.exports = {
  EVENTS_PREFERENCES: {
    SET_THEME: "preferences:setTheme",
    SET_THEME_CODE: "preferences:setThemeCode",
    SET_COLOR: "preferences:setColor",
    SET_FONT: "preferences:setFont",
    SET_EDITOR_TYPE: "preferences:setEditorType",
  },

  EVENTS_FILE: {
    SET_FILE: "file:setFile",
    UPDATE_CONTENT: "file:updateContent",
  },

  EVENTS_TERMINAL: {
    TERMINAL_INPUT: "terminal:input",
    TERMINAL_OUTPUT: "terminal:output",
    GET_HISTORY_COMMANDS: "terminal:getHistoryCommands",
    APPEND_HISTORY_COMMAND: "terminal:appendHistoryCommand",
  },
};
