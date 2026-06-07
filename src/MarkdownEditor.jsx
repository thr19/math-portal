import { useEffect, useRef, useState } from 'react'
import MarkdownRenderer from './MarkdownRenderer.jsx'

const LOCAL_STORAGE_KEY = 'mathPortalDraft'

const defaultDraft = `# Draft a new blog post

Welcome to the Math Portal editor.

Write with Markdown and preview it live.

## Features

- Headings
- Bold / italic text
- Lists
- Blockquotes
- Inline code
- Code blocks
- LaTeX math support (inline and display)

Use math like: $E = mc^2$ or:

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$
`

const defaultTitle = 'New blog post title'

const toolbarButtons = [
  { label: 'H1', insert: '# ' },
  { label: 'H2', insert: '## ' },
  { label: 'Bold', wrap: ['**', '**'] },
  { label: 'Italic', wrap: ['_', '_'] },
  { label: 'Link', wrap: ['[', '](url)'], placeholder: 'text' },
  { label: 'List', insert: '- ' },
  { label: 'Quote', insert: '> ' },
  { label: 'Code', wrap: ['`', '`'] },
  { label: 'Math', wrap: ['$', '$'] },
  { label: 'Display', insert: '\n$$\nYour equation here\n$$\n' }
]

export default function MarkdownEditor({ onPublish }) {
  const [draft, setDraft] = useState(defaultDraft)
  const [title, setTitle] = useState(defaultTitle)
  const [status, setStatus] = useState('Draft auto-load ready')
  const textareaRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.title) setTitle(parsed.title)
        if (parsed.content) setDraft(parsed.content)
        setStatus('Loaded saved draft')
      } catch {
        setDraft(saved)
      }
    }
  }, [])

  function updateDraft(value) {
    setDraft(value)
  }

  function insertAtCursor(action) {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = draft.slice(start, end)
    let newText = draft
    let newStart = start
    let newEnd = end

    if (typeof action === 'string') {
      newText = `${draft.slice(0, start)}${action}${draft.slice(end)}`
      newStart = newEnd = start + action.length
    } else {
      const wrap = Array.isArray(action) ? action : action.wrap
      const [prefix, suffix] = wrap
      const placeholder = action.placeholder || 'text'
      const content = selected || placeholder
      newText = `${draft.slice(0, start)}${prefix}${content}${suffix}${draft.slice(end)}`
      newStart = start + prefix.length
      newEnd = newStart + content.length
    }

    setDraft(newText)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(newStart, newEnd)
    })
  }

  function saveDraft() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ title, content: draft })
    )
    setStatus('Draft saved locally')
  }

  async function publishDraft() {
    if (onPublish) {
      const success = await onPublish({ title, content: draft })
      setStatus(success ? 'Published successfully' : 'Publish failed')
      return
    }

    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}-published`,
      JSON.stringify({
        title,
        content: draft,
        publishedAt: new Date().toISOString(),
      })
    )
    setStatus('Published draft locally — backend integration next')
  }

  return (
    <div className="markdown-editor">
      <div className="markdown-editor__pane">
        <div className="markdown-editor__header">Write in Markdown</div>

        <input
          className="markdown-editor__title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Post title"
          aria-label="Post title"
        />

        <div className="markdown-editor__toolbar">
          {toolbarButtons.map(({ label, insert, wrap, placeholder }, index) => {
            const action = wrap
              ? () => insertAtCursor({ wrap, placeholder })
              : () => insertAtCursor(insert)
            return (
              <button
                type="button"
                key={label + index}
                className="markdown-editor__button"
                onClick={action}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="markdown-editor__actions">
          <button type="button" className="markdown-editor__action-button" onClick={saveDraft}>
            Save draft
          </button>
          <button
            type="button"
            className="markdown-editor__action-button markdown-editor__action-button--primary"
            onClick={publishDraft}
          >
            Publish
          </button>
          <span className="markdown-editor__status">{status}</span>
        </div>

        <textarea
          ref={textareaRef}
          className="markdown-editor__textarea"
          value={draft}
          onChange={(event) => updateDraft(event.target.value)}
          aria-label="Markdown editor"
        />
      </div>

      <div className="markdown-editor__pane markdown-editor__preview">
        <div className="markdown-editor__header">Preview</div>
        <div className="markdown-editor__preview-box">
          <MarkdownRenderer content={draft} />
        </div>
      </div>
    </div>
  )
}
