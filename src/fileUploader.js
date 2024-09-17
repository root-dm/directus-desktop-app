const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { dialog, BrowserWindow } = require('electron');
const { getAccessToken, logError, getMimeType, sendNotification } = require('./helper');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: new AWS.Endpoint(process.env.S3_ENDPOINT),
    region: process.env.S3_REGION,
    s3ForcePathStyle: true
});

function openFileUploader() {
    const win = BrowserWindow.getFocusedWindow();

    dialog.showOpenDialog(win, {
        properties: ['openFile'],
        filters: [
            { name: 'All Files', extensions: ['*'] }
        ]
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            const fileName = path.basename(filePath);
            const mimeType = getMimeType(filePath);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error('An error occurred reading the file:', err);
                    return;
                }

                uploadFileToS3(fileName, data).then(async (fileUrl) => {
                    await notifyDirectus(fileUrl, fileName, mimeType);
                }).catch((uploadErr) => {
                    console.error('Upload failed:', uploadErr);
                });
            });
        }
    }).catch(err => {
        console.error('An error occurred:', err);
    });
}

function uploadFileToS3(fileName, fileContent) {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: fileContent,
        ACL: 'public-read'
    };

    logError(`Uploading file to DigitalOcean Spaces: ${JSON.stringify(params)}`);

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                logError(`Error uploading file to DigitalOcean Spaces: ${err}`);
                reject(err);
            } else {
                logError(`File uploaded to DigitalOcean Spaces: ${data.Location}`);
                resolve(data.Location);
            }
        });
    });
}

async function notifyDirectus(fileUrl, title, mimeType) {
    const directusUrl = process.env.APP_URL || 'https://your-directus-instance.com';
    const accessToken = await getAccessToken() || 'your-access-token';

    const fileData = {
        url: fileUrl,
        data: {
            title: title,
            type: mimeType
        }
    };

    try {
        let response = await axios.post(`${directusUrl}/files/import`, fileData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        sendNotification(true, 'File Uploaded', 'File successfully uploaded and imported into Directus', `${directusUrl}/admin/files/${response.data.data.id}`);
    } catch (error) {
        console.error(`Error importing file into Directus: ${error}`);
    }
}

module.exports = {
    openFileUploader
};
