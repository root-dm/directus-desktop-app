const path = require('path');
const { app, session, Notification } = require('electron');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function getAccessToken() {
  const { default: Store } = await import('electron-store');
  const store = new Store();
  let token = store.get('directus_access_token');

  const cookies = await session.defaultSession.cookies.get({ url: process.env.DIRECTUS_URL });
  const tokenCookie = cookies.find(cookie => cookie.name === 'directus_session_token');

  if (tokenCookie) {
    const newToken = tokenCookie.value;
    if (newToken !== token) {
      token = newToken;
      store.set('directus_access_token', token);
    }
  }

  return token;
}

function getAppVersion() {
  return app.getVersion();
}

function getAppName() {
  logError(process.env.APP_NAME || 'Directus Desktop');
  return process.env.APP_NAME || 'Directus Desktop';
}

function getAppUrl() {
  logError(process.env.APP_URL || 'https://app.directus.io');
  return process.env.APP_URL || 'https://app.directus.io';
}

function getIconPath() {
  logError(path.join(__dirname, 'images', 'icon.ico'));
  return path.join(__dirname, 'images', 'icon.ico');
}

function getLogFilePath() {
  const documentsPath = app.getPath('documents');
  const folderName = process.env.APP_NAME || 'DirectusDesktop';
  const logFolderPath = path.join(documentsPath, folderName);

  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
  }

  return path.join(logFolderPath, 'debug.log');
}

function logError(error) {
  const logFile = getLogFilePath();
  const errorMessage = `${new Date().toISOString()} - ${error.stack || error}\n`;

  fs.appendFile(logFile, errorMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}

function sendNotification(isSuccess, title, message, action) {
  const iconPath = path.join(__dirname, '..', 'images', 'icon.ico');

  const notification = {
    title: title,
    body: message,
    subtitle: isSuccess ? 'Success' : 'Error',
    icon: iconPath,
  };
  const notificationObject = new Notification(notification);

  notificationObject.show();
}

module.exports = {
  getAppName,
  getAppUrl,
  getIconPath,
  getLogFilePath,
  logError,
  getAppVersion,
  getAccessToken,
  sendNotification
};
