import { API } from '../preload/types'

declare global {
  interface Window {
    api: API
  }
}

export {}
