const fileinput = document.getElementById('fileinput')
//const output = document.getElementById('output')
const table = document.getElementById("infoTable")
const wscontainer = document.getElementById("ws-container")
//import {WaveSurfer} from 'wavesurfer.js'
//import {Spectrogram} from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
//const WaveSurfer = require('wavesurfer.js');
//const Spectrogram = require('wavesurfer.js/dist/plugins/spectrogram.esm.js');

function stringToAssociativeArray(str) {
  const result = {};
  const lines = str.split('\n');
  lines.forEach(line => {
    if (line.trim().length > 0 &&
      line.startsWith("General") == false &&
      line.startsWith("Audio") == false
    ) {
      const [key, value] = line.split(':');
      result[key.trim()] = value.trim();
    }
  });
  return result;
}
function clearTable() {
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

const onChangeFile = (mediainfo) => {
  const file = fileinput.files[0]
  const blob = new Blob([file], { type: file.type });
  const url_file = URL.createObjectURL(blob);
  while (wscontainer.firstChild) {
    wscontainer.removeChild(wscontainer.firstChild);
  }
  const ws = WaveSurfer.create({
    container: wscontainer,
    waveColor: 'rgb(100, 100, 200)',
    progressColor: 'rgb(50, 50, 200)',
    url: url_file,
  })

  ws.registerPlugin(
    WaveSurfer.Spectrogram.create({
      labels: true,
      height: 200,
      splitChannels: true,
    })
  )
  if (file) {
    //output.value = 'Working…'
    const readChunk = async (chunkSize, offset) =>
      new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())
    let dict = {}
    mediainfo
      .analyzeData(file.size, readChunk)
      .then((result) => {
        //output.value = result
        dict = stringToAssociativeArray(result)
        console.log(dict)
        clearTable()
        let newRow = table.insertRow();
        newRow.classList.add("bg-base-200");

        newRow.insertCell().textContent = "フォーマット";//"Format";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Format"];

        newRow = table.insertRow();
        newRow.insertCell().textContent = "ファイルサイズ";//"File size";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["File size"];

        newRow.insertCell().textContent = "長さ";//"Duration";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Duration"];

        newRow = table.insertRow();
        newRow.insertCell().textContent = "サンプリングレート"//"Sampling rate";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Sampling rate"];
        newRow.insertCell().textContent = "チャンネル数";//"Channel(s)";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Channel(s)"];

        newRow = table.insertRow();
        newRow.insertCell().textContent = "ビットレート";//"Bit rate";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Bit rate"];
        newRow.insertCell().textContent = "ビットレートモード";//"Bit rate mode";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Bit rate mode"];

        newRow = table.insertRow();
        newRow.insertCell().textContent = "プロファイル"//"Format profile";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Format profile"];
        newRow.insertCell().textContent = "圧縮タイプ";//"Compression mode";
        newRow.insertCell().textContent = ":";
        newRow.insertCell().textContent = dict["Compression mode"];
      })
      .catch((error) => {
        //output.value = `An error occured:\n${error.stack}`
      })
  }
}
MediaInfo.mediaInfoFactory({ format: 'text' }, (mediainfo) => {
  fileinput.removeAttribute('disabled')
  fileinput.addEventListener('change', () => onChangeFile(mediainfo))
})
