'use strict'

import { app, protocol, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { genAppTray } from '@/utils/mainprocess';
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

app.commandLine.appendSwitch('ignore-certificate-errors')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 系统托盘
let tray: Tray
// 主窗口
let mainWin: BrowserWindow
// 录屏mini控制窗口
let miniControlWin: BrowserWindow
const createMainWindow = async () => {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false,
    resizable: true,
    title: 'test',
    minimizable: true,
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    console.log('WEBPACK_DEV_SERVER_URL', process.env.WEBPACK_DEV_SERVER_URL)
    // Load the url of the dev server if in development mode
    await mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWin.loadURL('app://./index.html')
  }
}

const createControlWin = async () => {
  miniControlWin = new BrowserWindow({
    width: 200,
    height: 50,
    frame: false,
    resizable: true,
    title: 'miniControlBar',
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await miniControlWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    miniControlWin.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  console.log('App:active')
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

app.whenReady().then(() => {
  tray = genAppTray()
  tray.on('click', () => {
    mainWin.isMinimized() ? mainWin.restore() : mainWin.minimize()
  })


  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createMainWindow()
  ipcMain.on('quitApp', () => {
    app.quit();
  })
  ipcMain.on('minimizeApp', () => {
    mainWin.minimize()
  })
  ipcMain.on('start:screen capture', () => {
    console.log('start:screen capture')
    mainWin.minimize()
  })
})
  .catch(error => {
    console.log(111111)
    console.error(error)
  })
