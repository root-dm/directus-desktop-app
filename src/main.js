const { app } = require('electron');
const { createWindow } = require('./windowManager');
const { logError } = require('./helper');

function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(() => {
  createWindow().catch((error) => {
    logError(error);
  });

  checkForUpdates();
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version is available. Downloading now...',
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'A new version has been downloaded. Quit and install now?',
    buttons: ['Yes', 'Later'],
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
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