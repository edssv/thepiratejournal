import { useEffect, useState, useMemo } from 'react';

export const useDocTitle = (title: string) => {
    const [doctitle, setDocTitle] = useState(title);

    useEffect(() => {
        document.title = doctitle ? doctitle + ' - ' + 'The Pirate Journal' : 'The Pirate Journal';
    }, [doctitle]);

    return useMemo(() => ({ doctitle, setDocTitle }), [doctitle, setDocTitle]);
};
