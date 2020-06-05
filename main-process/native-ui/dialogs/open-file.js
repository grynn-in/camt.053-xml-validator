const {ipcMain, dialog} = require('electron')

ipcMain.on('open-file-dialog-xml', (event) => {
  dialog.showOpenDialog({
    //properties: ['openFile', 'openDirectory']
    properties: ['openFile']
  }, (files) => {
    if (files) {
      event.sender.send('selected-xml', files)
    }
  })
})


ipcMain.on('open-file-dialog-xsd', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, (files) => {
    if (files) {
      event.sender.send('selected-xsd', files)
    }
  })
})





/////////////////////////////
////// XML VALIDATOR  //////
///////////////////////////
///   npm install --save-dev electron-rebuild
///   Every time you run "npm install", run this:
///  ./node_modules/.bin/electron-rebuild

const fs = require('fs');
const libxmljs = require("libxmljs");
const assert = require('assert');

ipcMain.on('validate-xml', (event, arg) => {

    try {
        
        var xml = fs.readFileSync(arg.xml, 'utf8');
        var xsd = fs.readFileSync(arg.xsd, 'utf8');

        if (xml || xsd) {
            console.log("Files loaded successfully.");
        }
        else {
            event.sender.send('validate-xml-response', false);
        }

        var xsdDoc = libxmljs.parseXml(xsd);
        var xmlDocValid = libxmljs.parseXml(xml);

        event.sender.send('validate-xml-response', xmlDocValid.validate(xsdDoc));
        
    }
    catch(err) {
        console.log(err);
        event.sender.send('validate-xml-response', false);
    }

})

