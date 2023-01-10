import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { useAppDispatch, useArticle } from '../../../hooks';
import { setArticleCategory } from '../../../redux';

const categories = [
    { name: 'Обзоры', key: 'reviews' },
    { name: 'Прохождения', key: 'solutions' },
    { name: 'Отзывы', key: 'mentions' },
];

export const ListBoxPicker = () => {
    const dispatch = useAppDispatch();
    const { mutableArticle } = useArticle();

    const [selectedCategory, setSelectedCategory] = useState(mutableArticle?.category || {});

    return (
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="listBox">
                <Listbox.Button placeholder="Выбери категорию" className="listBoxButton">
                    {selectedCategory.name}
                    <span className="material-symbols-outlined">unfold_more</span>
                </Listbox.Button>
                <Listbox.Options className="listBoxOptions">
                    {categories.map((category) => (
                        <Listbox.Option
                            className="listBoxOption"
                            onClick={() => dispatch(setArticleCategory(category))}
                            key={category.key}
                            value={category}>
                            {({ active, selected }) => (
                                <div
                                    className={`${selected && 'selected'}
                                    optionContent
                                    `}>
                                    {selected && (
                                        <span className="material-symbols-outlined">check</span>
                                    )}{' '}
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
