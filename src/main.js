const { app } = require('electron');
const { createWindow } = require('./windowManager');
const { createTray } = require('./trayManager');
const { logError, getAppName } = require('./helper');

let tray = null;

app.whenReady().then(async () => {

  tray = createTray();

  createWindow().catch((error) => {
    logError(error);
  });
});

app.on('window-all-closed', (event) => {
  event.preventDefault();
});

app.on('before-quit', () => {
  if (tray) tray.destroy();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

process.on('uncaughtException', (error) => {
  logError(error);
  app.quit();
});

if (process.platform === 'win32') {
  app.setAppUserModelId(getAppName());
}