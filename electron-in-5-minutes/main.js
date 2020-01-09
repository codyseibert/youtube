const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 200,
    height: 100,
    resizable: false,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: '#16171a',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');

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
