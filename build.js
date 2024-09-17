require('dotenv').config();
const { execSync } = require('child_process');

const appName = process.env.APP_NAME || 'Directus Desktop';
const appVersion = process.env.APP_VERSION || '1.0.0';
const appDescription = process.env.APP_DESCRIPTION || 'Directus Desktop is a desktop application for Directus.';
const appId = process.env.APP_ID || 'com.directus.app';
const uninstallDisplayName = process.env.UNINSTALL_DISPLAY_NAME || `Uninstall ${appName}`;

execSync(
  `electron-builder --config.extraMetadata.name="${appName}" \
  --config.extraMetadata.version="${appVersion}" \
  --config.extraMetadata.description="${appDescription}" \
  --config.productName="${appName}" \
  --config.appId=${appId} \
  --config.nsis.uninstallDisplayName="${uninstallDisplayName}"`,
  { stdio: 'inherit' }
);
