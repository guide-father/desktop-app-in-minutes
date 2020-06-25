const { BrowserWindow, app ,remote} = require('electron');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");
const historyPath= (app || remote.app).getPath("userData") + "/history.csv";
// console.log(historyPath)

function openModel(parent, pageType) {
    modal = new BrowserWindow({
        width: 600,
        height: 700,
        title: 'Info',
        frame: false,
        backgroundColor: '#2e2c29',
        parent: parent,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // modal.webContents.openDevTools()
    switch (pageType) {
        case "Disclaimer":
            modal.loadFile("./src/info.html")
            break;
        case "History":
            modal.loadFile("./src/history.html")
            break;
    }
    modal.on('close', function () {
        modal = null;
    });
}

function writeHistory(url) {
    const csvWriter = createCsvWriter({
        path: historyPath,
        append:true,
        header: [
            { id: 'date', title: 'DATE' },
            { id: 'url', title: 'URL' }
        ]
    });
    const records = [
        { date: (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "), url: url }
    ]
    csvWriter.writeRecords(records)
}

function getHistory() {
    let histroy = [];
    return new Promise(function (resolve, reject) {
        fs.readFile(historyPath, 'utf8', function (err, data) {
            let dataArray = data.split(/\r?\n/);
            dataArray.forEach(d => {
                if (d) {
                    histroy.push(d.split(","))
                }
            })
            resolve(histroy);
        })
    })

}

module.exports = {
    openModel,
    writeHistory,
    getHistory
}