const path = require('path');
const { app } = require('electron');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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

module.exports = {
  getAppName,
  getAppUrl,
  getIconPath,
  getLogFilePath,
  logError,
};
