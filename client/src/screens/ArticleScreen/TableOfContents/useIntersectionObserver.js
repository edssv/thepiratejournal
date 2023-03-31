import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (setActiveId, translateIndicator) => {
    const headingElementsRef = useRef({});

    useEffect(() => {
        const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement) => {
                map[headingElement.target.id] = headingElement;
                return map;
            }, headingElementsRef.current);

            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement = headingElementsRef.current[key];
                if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });

            const getIndexFromId = (id) =>
                headingElements.findIndex((heading) => heading.id === id);

            if (visibleHeadings.length) {
                setActiveId(visibleHeadings[0].target.id);
                translateIndicator(36);
            } else if (visibleHeadings.length > 1) {
                const sortedVisibleHeadings = visibleHeadings.sort(
                    (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id),
                );
                setActiveId(sortedVisibleHeadings[0].target.id);
            }

            for (let i = 0; i < headingElements.length; i++) {
                if (visibleHeadings[0]?.target.id === headingElements[i].id) {
                    translateIndicator(36 * i);
                }
            }
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: '0px 0px -95% 0px',
        });

        const headingElements = Array.from(document.querySelectorAll('h2'));

        headingElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [setActiveId, translateIndicator]);
};
