const { app } = require('electron');
const { createWindow, createMenu } = require('./windowManager');
const { logError, getAppName } = require('./helper');

app.whenReady().then(async () => {
  createWindow().catch((error) => {
    logError(error);
  });

  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
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