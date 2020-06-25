const { BrowserWindow } = require('electron');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function openModel(parent,pageType) {
    modal = new BrowserWindow({
        width: 600,
        height: 700,
        title: 'Info',
        frame: false,
        backgroundColor: '#2e2c29',
        parent:parent,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // modal.webContents.openDevTools()
    switch (pageType) {
        case "Disclaimer":
            modal.loadFile("./src/info.html")
            break;
    }
    modal.on('close', function () {
        modal = null;
    });
}

function writeHistory(url ){
    const csvWriter = createCsvWriter({
        path: './temp/history.csv',
        append:true,
        header: [
            {id: 'date', title: 'DATE'},
            {id: 'url', title: 'URL'}
        ]
    });
    const records=[
        {date:new Date(),url:url}
    ]
    csvWriter.writeRecords(records)       
}
module.exports = {
    openModel,
    writeHistory
}