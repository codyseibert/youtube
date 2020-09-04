const { app, BrowserWindow, Menu } = require("electron");
const { dialog } = require("electron");
const fs = require("fs");

require("electron-reload")(__dirname);

let win;

const template = [
  {
    label: "File",
    submenu: [
      {
        id: "save-file",
        enabled: false,
        accelerator: "Ctrl+S",
        label: "Save File",
        click: async () => {
          win.webContents.send("saveFile");
        },
      },
      {
        label: "Open File",
        accelerator: "Ctrl+O",
        click: async () => {
          const { filePaths } = await dialog.showOpenDialog({
            properties: ["openFile"],
          });
          const file = filePaths[0];
          const contents = fs.readFileSync(file, "utf-8");
          win.webContents.send("fileOpened", {
            contents,
            filePath: file,
          });
          const saveFileItem = menu.getMenuItemById("save-file");
          saveFileItem.enabled = true;
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  win.webContents.openDevTools();

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

app.whenReady().then(createWindow);
