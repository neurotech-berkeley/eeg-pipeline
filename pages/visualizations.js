import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { channelNames, EEGReading, MuseClient } from 'muse-js';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
const museClient = new MuseClient();

function Visualizations() {
  const [testEEGData, setTestEEGData] = useState("");
  const [blink_state, setBlinkState] = useState("");

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
