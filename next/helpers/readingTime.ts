export function readingTime(articleContent: any) {
  const text = articleContent.current?.innerText ?? '';
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  return time;
}