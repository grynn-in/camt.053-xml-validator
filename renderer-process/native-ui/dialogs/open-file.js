const {ipcRenderer} = require('electron')

const selectDirBtn = document.getElementById('select-xml')

var xmlpath = {};


selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog-xml')
})

ipcRenderer.on('selected-xml', (event, path) => {
  document.getElementById('selected-xml-file').innerHTML = `${path}`;
  xmlpath.xml = `${path}`;
})


const selectDirBtnvinayak = document.getElementById('select-xsd')

selectDirBtnvinayak.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog-xsd')
})

ipcRenderer.on('selected-xsd', (event, path) => {
  document.getElementById('selected-xsd-file').innerHTML = `${path}`;
  xmlpath.xsd = `${path}`;
})


const selectvalidatexml = document.getElementById('validate-file')

selectvalidatexml.addEventListener('click', (event) => {
  ipcRenderer.send('validate-xml', xmlpath)
})

ipcRenderer.on('validate-xml-response', (event, arg) => {
    if (arg){
        document.getElementById('xml-response').innerHTML = `<h1 style="text-align: center;"><span style="color: #00ff00;"><svg class="section-icon"><use xlink:href="assets/img/icons.svg#icon-communication"></use></svg>XML FILE IS VALID</span></h1>`
    }
    else
    {
        document.getElementById('xml-response').innerHTML = `<h1 style="text-align: center;"><span style="color: #ff6600;"><svg class="section-icon"><use xlink:href="assets/img/icons.svg#icon-communication"></use></svg>XML FILE IS NOT VALID</span></h1>`
    }
   
})
