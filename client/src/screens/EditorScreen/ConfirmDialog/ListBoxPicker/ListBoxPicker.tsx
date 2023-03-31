import { useState } from 'react';
import { Listbox } from '@headlessui/react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const categories = ['Обзоры', 'Прохождения', 'Отзывы'];

export const ListBoxPicker = () => {
    const { setArticleCategory } = useActions();
    const { data } = useTypedSelector((state) => state.editorPage);

    const [selectedCategory, setSelectedCategory] = useState(data.category);

    return (
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="listBox">
                <Listbox.Button placeholder="Выбери категорию" className="listBoxButton">
                    {selectedCategory}
                    <span className="material-symbols-outlined unfoldMoreIcon">unfold_more</span>
                </Listbox.Button>
                <Listbox.Options className="listBoxOptions">
                    {categories.map((category) => (
                        <Listbox.Option
                            className="listBoxOption"
                            onClick={() => setArticleCategory(category)}
                            key={category}
                            value={category}
                        >
                            {({ active, selected }) => (
                                <div
                                    className={`${selected && 'selected'}
                                    optionContent
                                    `}
                                >
                                    {selected && <span className="material-symbols-outlined">check</span>} {category}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
};
