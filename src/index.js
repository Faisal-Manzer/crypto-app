const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = require('electron').ipcRenderer;


const notifyBtn = document.querySelector("#notifyBtn");
let price = document.querySelector('h1');
let targetPrice = document.getElementById('targetPrice');
let targetPriceVal = Infinity;

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/BTC.png')
};
const myNotification = new window.Notification(notification.title, notification)

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=INR')
        .then(res => {
            const cryptos = res.data.BTC.INR;
            price.innerHTML = '&#8377;&nbsp;' + cryptos.toLocaleString('en-IN');

            if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.INR){
                //const myNotification = new window.Notification(notification.title, notification)
            }
        })
}
getBTC();
setInterval(getBTC, 1000);
notifyBtn.onclick = function (e) {
  const modalPath = path.join('file://', __dirname, 'add.html');
  let win = new BrowserWindow({
      width: 400,
      height: 200,
      frame: false,
      alwaysOnTop: true
  });
  win.on('close', function () {
      win = null;
  });
  win.loadURL(modalPath);
  win.show();
};

ipc.on('targetPriceVal', function (e, arg) {
   targetPriceVal = Number(arg);
   targetPrice.innerHTML = '&#8377;&nbsp;' + targetPriceVal.toLocaleString('en-IN');
});