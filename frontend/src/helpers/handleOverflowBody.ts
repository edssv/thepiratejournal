export const handleOverflowBody = () => {
    if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
    } else document.body.style.overflow = 'hidden';
};
