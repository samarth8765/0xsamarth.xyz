import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p className="muted">This page doesn't exist.</p>
      <Link to="/">← Home</Link>
    </section>
  )
}
