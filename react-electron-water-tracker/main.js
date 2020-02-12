const { app, BrowserWindow } = require('electron');

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
      preload: __dirname + '/preload.js'
    }
  });

  // win.loadFile('index.html');
  win.loadURL('http://localhost:3000');

  // win.webContents.openDevTools();

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
