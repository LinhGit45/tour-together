const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function linkify(text: string) {
  const parts = text.split(URL_REGEX);
  
  return parts.map((part, index) => {
    if (part.match(URL_REGEX)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80"
          data-testid={`link-external-${index}`}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}
