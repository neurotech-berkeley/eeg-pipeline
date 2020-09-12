import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { channelNames, EEGReading, MuseClient } from 'muse-js';
import io from 'socket.io-client';
import * as Papa from 'papaparse';

const socket = io('http://localhost:5000');
const museClient = new MuseClient();

function Visualizations() {
  const [testEEGData, setTestEEGData] = useState("");
  const [blink_state, setBlinkState] = useState("");

  var fileList

  async function startMuseConnection(e) {
    await museClient.connect()
    await museClient.start()
    museClient.eegReadings.subscribe(reading => {
      socket.emit('eeg-stream', JSON.stringify(reading))
      console.log(reading);
    });
    museClient.telemetryData.subscribe(telemetry => {
      console.log(telemetry);
    });
    museClient.accelerometerData.subscribe(acceleration => {
      console.log(acceleration);
    });
  }

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


  function sendTestEEGData(evt) {
    evt.preventDefault();
    const data = '{"data":"' + testEEGData + '"}'
    socket.emit('test', data);
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

      <input type="file" id="file-selector"></input>
      <button onClick={streamCSVData}>
        TEST!
      </button>

      <br></br>
      <br></br>

      <form onSubmit={sendTestEEGData}>
        <label>
        Send Test Message to Flask: <tab></tab>
          <input type="text" name={testEEGData} onChange={e => setTestEEGData(e.target.value)}/>
        </label>
        <input type="submit" value="Send"/>
      </form>
      <p>Blink State: {blink_state}</p>
    </Layout>
  );
}

export default Visualizations;