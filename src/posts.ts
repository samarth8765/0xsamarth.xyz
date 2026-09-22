// Every .md file in src/posts becomes a blog post. The filename is the URL slug.
export type Post = {
  slug: string
  title: string
  date: string
  description: string
  draft: boolean
  content: string
  readingTime: number
}

const files = import.meta.glob<string>('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, string>, content: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    data[key] = line.slice(i + 1).trim().replace(/^["'](.*)["']$/, '$1')
  }
  return { data, content: match[2] }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, content } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
      draft: data.draft === 'true',
      content,
      readingTime: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    }
  })
  .filter((p) => !p.draft || import.meta.env.DEV)
  .sort((a, b) => b.date.localeCompare(a.date))

export const getPost = (slug: string | undefined) => posts.find((p) => p.slug === slug)

export function formatDate(date: string) {
  if (!date) return ''
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
