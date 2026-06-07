import { useEffect, useState } from 'react'
import { useAuth } from '../src/AuthContext.jsx'
import MarkdownEditor from '../src/MarkdownEditor.jsx'
import MarkdownRenderer from '../src/MarkdownRenderer.jsx'

const samplePost = `# Welcome to the Math Portal Blog

This is the place for:

- **Math tutorials**
- **Problem-solving guides**
- **Community updates**

> Write posts in Markdown and render them safely in the browser.

## What’s next

We will add blog post creation, categories, and author workflows next.`

export default function Blog() {
  const { user, loading, token } = useAuth()
  const [posts, setPosts] = useState([])
  const [publishMessage, setPublishMessage] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const res = await fetch('/api/blog/posts')
      if (!res.ok) {
        return
      }
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to load posts', error)
    }
  }

  async function handlePublish({ title, content }) {
    if (!token) {
      setPublishMessage('Please log in as an author before publishing.')
      return false
    }

    const res = await fetch('/api/blog/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, published: true }),
    })

    const result = await res.json()
    if (!res.ok) {
      setPublishMessage(result.error || 'Publish failed.')
      return false
    }

    setPublishMessage('Post published successfully!')
    fetchPosts()
    return true
  }

  const canPublish = user && ['AUTHOR', 'MODERATOR', 'ADMIN'].includes(user.role)

  return (
    <section className="page">
      <h1>Blog</h1>
      <p>Read our latest mathematics blog posts and articles.</p>
      <MarkdownRenderer content={samplePost} />

      <div className="section-head">
        <h2>Latest posts</h2>
        <p className="section-head__note">Published posts from the community.</p>
      </div>

      <ul className="articles-list">
        {posts.length ? (
          posts.map((post) => (
            <li key={post.id} className="article-row">
              <div className="article-row__num">#{post.id}</div>
              <div>
                <div className="article-row__title">{post.title}</div>
                <div className="article-row__date">
                  {new Date(post.createdAt).toLocaleDateString()} · {post.author?.name || 'Unknown author'}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="article-row">
            <div className="article-row__title">No published posts yet.</div>
          </li>
        )}
      </ul>

      <div className="section-head">
        <h2>Create post</h2>
        <p className="section-head__note">Author role users can publish directly to the blog.</p>
      </div>

      {loading ? (
        <p>Checking authentication…</p>
      ) : canPublish ? (
        <>
          <MarkdownEditor onPublish={handlePublish} />
          {publishMessage && <p className="article-row__date">{publishMessage}</p>}
        </>
      ) : (
        <div className="article-row__meta">
          <p>You need to be logged in as an author to publish posts.</p>
          <a href="/login">Login</a>
        </div>
      )}
    </section>
  )
}
