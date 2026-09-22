import { Link } from 'react-router-dom'
import { formatDate, type Post } from '../posts'

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return <p className="muted">Nothing here yet.</p>
  return (
    <ul className="post-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link to={`/blog/${p.slug}`}>
            <span className="post-title">{p.title}</span>
            <time className="muted" dateTime={p.date}>{formatDate(p.date)}</time>
          </Link>
        </li>
      ))}
    </ul>
  )
}
