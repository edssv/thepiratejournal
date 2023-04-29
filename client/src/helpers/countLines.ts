export const countLines = (el: any) => {
  if (el.current) {
    const divHeight = el.current.offsetHeight;
    const lineHeight = parseInt(el.current.style.lineHeight, 10);
    const lines = divHeight / lineHeight;
    return lines;
  }

  return '';
};
