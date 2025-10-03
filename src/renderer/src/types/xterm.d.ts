interface IFitAddon {
  fit(): void
  proposeDimensions(): { cols: number; rows: number } | undefined
  onDimensionsChange(callback: (dimensions: { cols: number; rows: number }) => void): void
}

declare global {
  interface Window {
    Terminal: typeof import('@xterm/xterm').Terminal
    FitAddon: {
      FitAddon: new () => IFitAddon
    }
  }
}

interface ITerminal {
  open(element: HTMLElement | null): void
  write(data: string): void
  clear(): void
  loadAddon(addon: any): void
  onKey(callback: (event: { key: string; domEvent: KeyboardEvent }) => void): void
  resize(cols: number, rows: number): void
  cols: number
  rows: number
  options: {
    fontSize?: number
    lineHeight?: number
    fontFamily?: string
    allowTransparency?: boolean
    theme?: {
      background?: string
      foreground?: string
      cursor?: string
      selection?: string
      black?: string
      red?: string
      green?: string
      yellow?: string
      blue?: string
      magenta?: string
      cyan?: string
      white?: string
      brightBlack?: string
      brightRed?: string
      brightGreen?: string
      brightYellow?: string
      brightBlue?: string
      brightMagenta?: string
      brightCyan?: string
      brightWhite?: string
    }
  }
  prompt?: () => void
}

interface ITerminalOptions {
  fontSize?: number
  lineHeight?: number
  fontFamily?: string
  allowTransparency?: boolean
  theme?: {
    background?: string
    foreground?: string
    cursor?: string
    selection?: string
    black?: string
    red?: string
    green?: string
    yellow?: string
    blue?: string
    magenta?: string
    cyan?: string
    white?: string
    brightBlack?: string
    brightRed?: string
    brightGreen?: string
    brightYellow?: string
    brightBlue?: string
    brightMagenta?: string
    brightCyan?: string
    brightWhite?: string
  }
}

interface TerminalConstructor {
  new (options?: ITerminalOptions): ITerminal
}

export {}
