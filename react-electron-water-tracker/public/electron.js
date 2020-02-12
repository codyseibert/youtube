const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 100,
    resizable: false,
    frame: true,
    autoHideMenuBar: true,
    backgroundColor: '#FFFFFF',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(
          __dirname,
          '../build/index.html'
        )}`
  );

  if (isDev) win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  win.on('ready-to-show', () => {
    app.dock && app.dock.hide();
    win.show();
    app.dock && app.dock.show();
    win.setAlwaysOnTop(true);
    win.setVisibleOnAllWorkspaces(true);
    win.fullScreenable = false;
  });
}

app.on('ready', createWindow);
