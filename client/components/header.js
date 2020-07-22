import Link from 'next/link'

function Header({ user, loading }) {
  return (
    <header>
      <nav>
        <ul>
          {!loading &&
            (user ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/advanced/ssr-profile">
                    <a>Server rendered profile (advanced)</a>
                  </Link>
                </li> */}
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/api/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>

      <style jsx>{`
        header {

          padding: 0.01em;
          color: #000000;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:nth-child(2) {
          margin-right: auto;
        }
        a {
          color: #000000;
        // text-decoration: underline;
        text-decoration-color: blue;
        }
        button {
          font-size: 1rem;
          color: #000000;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  )
}

export default Header
