import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { channelNames, EEGReading, MuseClient } from 'muse-js';
import neuroskyy from 'node-neurosky';
import nodeThinkGearr from 'node-thinkgear';

function Connect() {
  var museClient = new MuseClient();
  var tgClientt = nodeThinkGearr.createClient({
    appName: 'My Great Application',
    appKey: '1234567890abcdef...'
  });
  var neuroskyClient = neuroskyy.createClient({
    appName:'NodeNeuroSky',
    appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
  });

  function startMuseConnection(e) {
    museClient.start()
    //Create websocket connection to Flask server here
  }

  function startNeuroskyConnection(e) {
    neuroskyClient.on('data',function(data){
      console.log(data)
    });
    //Create websocket connection to Flask server here
  }

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


      <h1>Connect a Neurosky Headset!</h1>
      <button onClick={() => tgClientt.connect()}>
        Connect
      </button>
      <button onClick={startNeuroskyConnection}>
        Start Recording!
      </button>
    </Layout>
  );
}

export default Connect;
