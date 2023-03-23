export const getHeadings = (headingElements) => {
    const headings = [];

    headingElements.forEach((heading, index) => {
        const { innerText: title, id } = heading;

        headings.push({ id, title });
    });

    return headings;
};
