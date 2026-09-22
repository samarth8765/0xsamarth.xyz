import { Link } from 'react-router-dom'
import { site } from '../config'
import { posts } from '../posts'
import PostList from '../components/PostList'

export default function Home() {
  return (
    <>
      <section>
        <h1>{site.name}</h1>
        {site.intro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <ul className="socials">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                {...(s.url.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent writing</h2>
        <PostList posts={posts.slice(0, 5)} />
        {posts.length > 5 && (
          <p>
            <Link to="/blog">All posts →</Link>
          </p>
        )}
      </section>
    </>
  )
}
