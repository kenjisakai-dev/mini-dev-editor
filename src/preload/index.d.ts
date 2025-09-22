import { api } from '@renderer/api'

declare global {
  interface Window {
    api: typeof api
  }
}
