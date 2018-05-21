const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const ipc = require('electron').ipcRenderer;

const closeBtn = document.querySelector("#closeBtn");

closeBtn.onclick = function (e) {
    var window = remote.getCurrentWindow();
    window.close();
};

const updateBtn = document.querySelector('#updateBtn');
updateBtn.onclick = function () {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value);

    var window = remote.getCurrentWindow();
    window.close();
};