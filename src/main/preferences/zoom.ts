import { BrowserWindow } from 'electron'
import { store } from '@main/store/store'
import config from '@main/preferences/config'

export function setZoom(mainWindow: BrowserWindow, zoom: number) {
  store.set('zoom', zoom)
  mainWindow.webContents.setZoomFactor(zoom)
}

export const zoomAppDefault = () => 1.2

export const zoomIn = () => parseFloat((config.getZoom() + 0.1).toFixed(1))
export const zoomOut = () => parseFloat((config.getZoom() - 0.1).toFixed(1))

export const permissionZoomIn = () => zoomIn() <= 2.0
export const permissionZoomOut = () => zoomOut() >= 1.0
