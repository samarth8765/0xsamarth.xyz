import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getPost, formatDate } from '../posts'
import { site } from '../config'
import NotFound from './NotFound'

export default function Post() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    document.title = post ? `${post.title} — ${site.name}` : site.name
  }, [post])

  if (!post) return <NotFound />

  return (
    <article>
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
        </p>
      </header>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
      <p className="back">
        <Link to="/blog">← All posts</Link>
      </p>
    </article>
  )
}
