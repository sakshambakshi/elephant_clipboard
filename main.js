// Modules to control application life and create native browser window
const {app, BrowserWindow , Menu, Tray , clipboard } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    frame:false
  })
  mainWindow.hide();

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.on("closed" , function(){
    mainWindow = null;
  })
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null
app.whenReady().then(() => {
  let mainWindow = createWindow()
  
  tray = new Tray('icons/elephant.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  
  
  
  tray.on("click" , function(){
    // console.log(clipboard.readText())
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  mainWindow.on("show" , function(){
    //repostion screen near tray icon
    const {x , y} =  tray.getBounds();
    const [width , height] = mainWindow.getSize()
    const updatedX = x - width ;
    const updatedY = y - height;
    mainWindow.setBounds({x : updatedX , y: updatedY })
    console.log({width , height})
  })



  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  tray.destroy()
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
