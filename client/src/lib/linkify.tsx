const URL_REGEX = /(https?:\/\/[^\s<]+)/g;

export function linkify(text: string): string {
  // Auto-linkify URLs that aren't already in anchor tags
  return text.replace(URL_REGEX, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">${url}</a>`;
  });
}

export function renderHtml(htmlString: string) {
  return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
