export const countLines = (el: any) => {
    if (el.current) {
        const divHeight = el.current.offsetHeight;
        const lineHeight = parseInt(el.current.style.lineHeight);
        const lines = divHeight / lineHeight;
        return lines;
    }

    return '';
};
