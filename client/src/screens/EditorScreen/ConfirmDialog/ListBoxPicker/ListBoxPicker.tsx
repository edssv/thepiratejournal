import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ArticleCategory } from '@/lib/enums';

const categories = ['Обзоры', 'Прохождения', 'Отзывы'];

export const ListBoxPicker = () => {
  const { setArticleCategory } = useActions();
  const { data } = useTypedSelector((state) => state.editorPage);

  const [selectedCategory, setSelectedCategory] = useState(data.category ?? ArticleCategory.REVIEWS);

  return (
    <div>
      <h4 className="confirmDialogItemLabel">Категория</h4>
      <Listbox onChange={setSelectedCategory} value={selectedCategory}>
        {({ open }) => (
          <div className="listBox">
            <Listbox.Button placeholder="Выбери категорию" className={clsx('listBoxButton', open && 'openListBox')}>
              {selectedCategory}
              <span className="material-symbols-outlined unfoldMoreIcon">arrow_drop_down</span>
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
                    <div className={clsx(selected && 'selected', 'optionContent')}>
                      {selected && <span className="material-symbols-outlined">check</span>} {category}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};
