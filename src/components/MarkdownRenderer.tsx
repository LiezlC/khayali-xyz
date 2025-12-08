'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
  title?: string;
}

export default function MarkdownRenderer({ content, title }: MarkdownRendererProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-emerald-900">
      <div className="absolute top-4 left-4 z-10">
        <a
          href="javascript:history.back()"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back
        </a>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-20">
        {title && (
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h1>
        )}

        <article className="prose prose-invert prose-lg max-w-none
          prose-headings:bg-gradient-to-r prose-headings:from-blue-400 prose-headings:to-purple-400
          prose-headings:bg-clip-text prose-headings:text-transparent
          prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
          prose-strong:text-emerald-400 prose-strong:font-semibold
          prose-code:text-pink-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg
          prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4
          prose-blockquote:italic prose-blockquote:text-gray-400
          prose-ul:text-gray-300 prose-ol:text-gray-300
          prose-li:mb-2
          prose-hr:border-gray-700 prose-hr:my-8
          bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
