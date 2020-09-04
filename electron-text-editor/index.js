const { ipcRenderer } = require("electron");
const fs = require("fs");
let openedFilePath;

const codeElm = document.getElementById("code");

ipcRenderer.on("fileOpened", (event, { contents, filePath }) => {
  openedFilePath = filePath;
  codeElm.value = contents;
  codeElm.style.display = "inline-block";
  document.getElementById("file-path").innerText = filePath;
});

ipcRenderer.on("saveFile", (event) => {
  const currentCodeValue = codeElm.value;
  fs.writeFileSync(openedFilePath, currentCodeValue, "utf-8");
});
