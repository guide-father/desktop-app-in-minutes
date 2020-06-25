const { app, BrowserWindow, Menu, shell } = require('electron');
const utility =require("./utility");

function createWindow() {
    const win = new BrowserWindow({
        width: 1100,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //   win.webContents.openDevTools()
    win.loadURL("https://www.blog.guidefather.in")
    const menu = Menu.buildFromTemplate([{
        label: "Menu",
        submenu: [
            {
                label: "Disclaimer",
                click() {
                    utility.openModel(win,"Disclaimer")
                }
            },
            {
                label: "View Article",
                click() {
                    shell.openExternal("https://www.blog.guidefather.in")
                }
            },
            { type: "separator" },
            {
                label: "Exit",
                click(){
                    app.quit()
                }
            }
        ]

    }])
    Menu.setApplicationMenu(menu)

    win.webContents.on("will-navigate",function(e,url){
       utility.writeHistory(url)
    })

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
