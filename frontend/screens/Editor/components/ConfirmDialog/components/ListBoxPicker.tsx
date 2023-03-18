import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Listbox } from '@headlessui/react';

import { useAppDispatch } from '../../../../../hooks';
import { editorDataSelector, setArticleCategory } from '../../../../../redux';

const categories = [
    { name: 'Обзоры', key: 'reviews' },
    { name: 'Прохождения', key: 'solutions' },
    { name: 'Отзывы', key: 'mentions' },
];

export const ListBoxPicker = () => {
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);

    const [selectedCategory, setSelectedCategory] = useState(data.category);

    return (
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="listBox">
                <Listbox.Button placeholder="Выбери категорию" className="listBoxButton">
                    {selectedCategory?.name}
                    <span className="material-symbols-outlined unfoldMoreIcon">unfold_more</span>
                </Listbox.Button>
                <Listbox.Options className="listBoxOptions">
                    {categories.map((category) => (
                        <Listbox.Option
                            className="listBoxOption"
                            onClick={() => dispatch(setArticleCategory(category))}
                            key={category.key}
                            value={category}
                        >
                            {({ active, selected }) => (
                                <div
                                    className={`${selected && 'selected'}
                                    optionContent
                                    `}
                                >
                                    {selected && <span className="material-symbols-outlined">check</span>}{' '}
                                    {category.name}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
};
