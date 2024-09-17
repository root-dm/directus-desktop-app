const { Tray, Menu } = require('electron');
const path = require('path');
const { getAppName } = require('./helper');
const { showWindow } = require('./windowManager');

let tray = null;

function createTray() {
    tray = new Tray(path.join(__dirname, '..', './images/', 'icon.ico'));

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