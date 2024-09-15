const { app } = require('electron');
const { createWindow } = require('./windowManager');
const { logError } = require('./helper');

app.whenReady().then(() => {
  createWindow().catch((error) => {
    logError(error);
  });
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