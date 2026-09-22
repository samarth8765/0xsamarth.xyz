import { useEffect } from 'react'
import { posts } from '../posts'
import { site } from '../config'
import PostList from '../components/PostList'

export default function Blog() {
  useEffect(() => {
    document.title = `Blog — ${site.name}`
  }, [])

  return (
    <section>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </section>
  )
}
