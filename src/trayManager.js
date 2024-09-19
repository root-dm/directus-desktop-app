const { Tray, Menu } = require('electron');
const path = require('path');
const { getAppName, getIconNativeImage } = require('./helper');
const { showWindow } = require('./windowManager');

let tray = null;

function createTray() {
    tray = new Tray(getIconNativeImage());

    const trayMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => showWindow() },
        { label: 'Quit', click: () => app.quit() }
    ]);

    tray.setToolTip(getAppName());
    tray.setContextMenu(trayMenu);

    tray.on('click', () => {
        showWindow();
    });

    return tray;
}

module.exports = { createTray };