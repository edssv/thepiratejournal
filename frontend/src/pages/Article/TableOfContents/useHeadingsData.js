import { useEffect, useState } from 'react';
import { getHeadings } from './getHeadings';

export const useHeadingsData = () => {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const headingsElements = Array.from(document.querySelectorAll('h2'));

        const newNestedHeadings = getHeadings(headingsElements);
        setHeadings(newNestedHeadings);
    }, []);

    return { headings };
};
