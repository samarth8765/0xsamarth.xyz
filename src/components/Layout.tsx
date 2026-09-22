import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../config'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="container">
      <header className="header">
        <NavLink to="/" className="logo">
          {site.handle}
        </NavLink>
        <nav>
          <NavLink to="/" end>home</NavLink>
          <NavLink to="/blog">blog</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  )
}
