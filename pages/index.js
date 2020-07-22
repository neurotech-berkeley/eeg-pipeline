import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import Header from '../components/header'

export default function Home() {
  const { user, loading } = useFetchUser()
  return (
    <div className="container">
      <Head>
        <title>EEG Pipeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={user} loading={loading} />

      <main>
        <h1 className="title">
          One stop shop EEG Pipeline!
        </h1>

        <p className="description">
          Work in progress. Support for Muse coming soon! 
        </p>
        <p>
          Largely built on the Next.js tutorial, design refresh to come soon! 
        </p>

        

        <div className="grid">

        <Link href = "/learn">
        <a className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Neurotech in a visual and interactive way!</p>
        </a></Link>

          <Link href="/neurofeedback/connect"><a className="card">
            <h3>Visualize EEG &rarr;</h3>
            <p> Visualize and record filtered and processed EEG signals.</p>
            </a></Link>

          <Link href = "/modeling">
          <a className="card">
            <h3>Modeling &rarr;</h3>
            <p>Develop models to predict mental state. </p>
          </a></Link>

          <Link href = "/games">
          <a className="card">
            <h3>Neural Feedback &rarr;</h3>
            <p>
              Play and develop incredible neural feedback games. 
            </p>
          </a></Link>

          <Link href = "/database">
          <a className="card">
            <h3>Access Data &rarr;</h3>
            <p>
              Get access to cleaned and curated datasets. 
            </p>
          </a></Link>

          
          <a className="card" href = "https://neurotech.berkeley.edu/">
            <h3>NT@B &rarr;</h3>
            <p>
              Learn more about Neurotech@Berkeley. 
            </p>
          </a>
          
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
