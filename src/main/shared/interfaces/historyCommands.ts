export interface HistoryCommands {
  commands: string[]
  lastCommand: string
}

export interface AllHistoryCommands {
  pwsh: HistoryCommands
  cmd: HistoryCommands
  powershell: HistoryCommands
}
