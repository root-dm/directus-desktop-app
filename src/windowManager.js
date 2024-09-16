// windowManager.js
const { screen, BrowserWindow } = require('electron');
const { getAppName, getAppUrl, getIconPath, logError } = require('./helper');

async function createWindow() {
  const Store = (await import('electron-store')).default;
  const store = new Store();

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const defaultWidth = Math.floor(width * 0.8);
  const defaultHeight = Math.floor(height * 0.8);
  const windowBounds = store.get('windowBounds') || { width: defaultWidth, height: defaultHeight };

  const win = new BrowserWindow({
    width: windowBounds.width,
    height: windowBounds.height,
    x: windowBounds.x || undefined,
    y: windowBounds.y || undefined,
    title: getAppName(),
    icon: getIconPath(),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      backgroundThrottling: false,
      acceleratedCanvas: true,
      webSecurity: true,
      safeDialogs: true,
    },
  });

  win.loadURL(getAppUrl());

  win.on('resize', () => {
    const { width, height } = win.getBounds();
    win.webContents.send('window-resize', { width, height });
    store.set('windowBounds', win.getBounds());
  });

  win.on('move', () => {
    store.set('windowBounds', win.getBounds());
  });
}

module.exports = { createWindow };
