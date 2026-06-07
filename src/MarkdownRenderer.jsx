import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import 'katex/dist/katex.min.css'

const katexSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    span: [
      ...(defaultSchema.attributes?.span || []),
      ['className'],
      ['style']
    ],
    math: [
      ...(defaultSchema.attributes?.math || []),
      ['className'],
      ['style']
    ],
    annotation: [
      ...(defaultSchema.attributes?.annotation || []),
      ['className'],
      ['style']
    ],
    svg: [
      ...(defaultSchema.attributes?.svg || []),
      ['className'],
      ['style'],
      ['viewBox'],
      ['xmlns']
    ],
    path: [
      ...(defaultSchema.attributes?.path || []),
      ['className'],
      ['d'],
      ['fill'],
      ['stroke']
    ]
  }
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, [rehypeSanitize, katexSchema]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
