export function setOverflowBody() {
    const hidden = document.body.style.overflow === 'hidden';

    document.body.style.overflow = hidden ? '' : 'hidden';
}
