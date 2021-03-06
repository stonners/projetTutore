const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1800,
        height: 1200,
        icon: "assets/logo.png",
        title: 'DuelQuizz',
        movable: true,
        fullscreen: false
    });

    mainWindow.loadURL(`file://${__dirname}/html/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

