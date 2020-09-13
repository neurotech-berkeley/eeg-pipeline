import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { channelNames, EEGReading, zipSamples, EEGSample, MuseClient } from 'muse-js';
import { Observable, Subject } from 'rxjs';
import io from 'socket.io-client';
import * as Papa from 'papaparse';

const socket = io('http://localhost:5000');
const museClient = new MuseClient();

function Visualizations() {
  const [blink_state, setBlinkState] = useState("");

  var fileList;

  var recording = false;
  var recordingSamples;
  var subscription;

  async function startMuseConnection(e) {
    await museClient.connect()
    await museClient.start()
    // zipSamples(museClient.eegReadings).subscribe(sample => {
    //   socket.emit('eeg-stream', [sample.timestamp, ...sample.data]);
    // });
    // museClient.telemetryData.subscribe(telemetry => {
    //   console.log(telemetry);
    // });
    // museClient.accelerometerData.subscribe(acceleration => {
    //   console.log(acceleration);
    // });
  }

  function startRecording() {
    recording = true;
    recordingSamples = [];
    subscription = zipSamples(museClient.eegReadings).subscribe(sample => {
      sample = [sample.timestamp, ...sample.data]
      recordingSamples.push(sample);
      socket.emit('eeg-stream', sample);
    });
  }

  function stopRecording() {
    recording = false;
    subscription.unsubscribe();
  }

  function downloadRecording(e) {
    const a = document.createElement('a');
    const headers = ['time', ...channelNames].join(',');
    const csvData = headers + '\n' + recordingSamples.map(item => item.join(',')).join('\n');
    const file = new Blob([csvData], { type: 'text/csv' });
    a.href = URL.createObjectURL(file);
    document.body.appendChild(a);
    a.download = 'recording.csv';
    a.click();
    document.body.removeChild(a);
  }

  useEffect(() => {
    socket.on('connect', (msg) => {
      console.log("Connected!")
    });
    socket.on('test-reply', (msg) => {
      console.log(msg)
    });
    socket.on('blink-state', (msg) => {
      console.log("Blink State: " + msg)
      setBlinkState(msg)
    });

    const fileSelector = document.getElementById('file-selector');

    fileSelector.addEventListener('change', (event) => {
      fileList = event.target.files;
      console.log(fileList);
    });
  }, []);


  async function streamCSVData(e) {
    Papa.parse(fileList[0], {
	    complete: function(results) {
        var rows = results.data
        var i = 0
        var interval = setInterval(function() {
          socket.emit('eeg-stream', rows[i]); 
          i++; 
          if(i >= rows.length) {
            clearInterval(interval)
          }
        }, 3.90625)
	    }
    });
  }

  return (
    <Layout>
      <Head>
        <title>EEG Visualizations</title>
      </Head>
      <h1>Connect a Muse Headset!</h1>
      <button onClick={startMuseConnection}>
        Connect!
      </button>

      <br></br>
      <br></br>

      <button onClick={startRecording}>
        Start Recording
      </button>

      <button onClick={stopRecording}>
        Stop Recording
      </button>

      <button onClick={downloadRecording}>
        Download Recording
      </button>

      <br></br>
      <br></br>

      <input type="file" id="file-selector"></input>
      <button onClick={streamCSVData}>
        TEST!
      </button>
      
      <br></br>

      <p>Blink State: {blink_state}</p>
    </Layout>
  );
}

export default Visualizations;