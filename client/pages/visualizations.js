import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { channelNames, EEGReading, MuseClient } from 'muse-js';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
const museClient = new MuseClient();

function Visualizations() {

  function startMuseConnection(e) {
    museClient.start()
    //Create websocket connection to Flask server here
    // museClient.eegReadings.subscribe(reading => {
    //   socket.emit('eeg-stream', JSON.stringify(reading))
    //   console.log(reading);
    // });
    // museClient.telemetryData.subscribe(telemetry => {
    //   console.log(telemetry);
    // });
    // museClient.accelerometerData.subscribe(acceleration => {
    //   console.log(acceleration);
    // });
  }

  useEffect(() => {
    socket.on('eeg-stream-reply', (msg) => {
      console.log(msg)
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>EEG Visualizations</title>
      </Head>
      <h1>Connect a Muse Headset!</h1>
      <button onClick={() => museClient.connect()}>
        Connect
      </button>
      <button onClick={startMuseConnection}>
        Start Recording!
      </button>
      <button onClick={() => socket.emit('eeg-stream', "This is EEG Data...")}>
        Send Message!
      </button>
    </Layout>
  );
}

export default Visualizations;
