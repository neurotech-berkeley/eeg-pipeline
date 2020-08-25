import Link from 'next/link'
import styles from './header.module.css'

function Header({ user, loading }) {
  return (
    <header className = {styles.header}>
      <nav className={styles.nav}>
        <ul className = {styles.ul}>
          {!loading &&
            (user ? (
              <>
                <li className = {styles.li} >
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/advanced/ssr-profile">
                    <a>Server rendered profile (advanced)</a>
                  </Link>
                </li> */}
                <li className = {styles.li} >
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li className = {styles.li}>
                <a href="/api/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>

      {/* <style jsx>{`
        
      `}</style> */}
    </header>
  )
}

export default Header
