import MarkdownIt from 'markdown-it'

const customStyle = `
<style>
  .markdown-content {
    color: #0B122F;
  }

  .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 {
  }

  .markdown-content p {
  }

  .markdown-content a {
    text-decoration: none;
  }

  .markdown-content a:hover {
    text-decoration: underline;
  }

  .markdown-content ul, .markdown-content ol {
    list-style-type: disc;
    margin-left: 20px;
    font-size: 16px;
  }

  .markdown-content code {
    font-family: "Courier New", monospace;
    padding: 2px 4px;
  }

  .markdown-content blockquote {
    margin: 0;
    padding: 10px 20px;
  }

  .markdown-content table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd; /* Add border to the table */
  }

  .markdown-content th, .markdown-content td {
    padding: 8px;
    border: 1px solid #ddd; /* Add border to table cells */
  }

  .markdown-content img {
    width: 100%;
    height: auto;
  }
</style>
`

interface RenderMarkdownProps {
  markdown: string
}

const RenderMarkdown = ({ markdown }: RenderMarkdownProps) => {
  const renderMarkdown = new MarkdownIt({
    html: true,
  })

  return (
    <div
      className='markdown-content'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: customStyle + renderMarkdown.render(markdown),
      }}
    />
  )
}

export default RenderMarkdown
