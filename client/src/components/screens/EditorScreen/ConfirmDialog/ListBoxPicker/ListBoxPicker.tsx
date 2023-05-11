import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ArticleCategory } from '@/lib/enums';

const categories = ['Обзоры', 'Прохождения', 'Отзывы'];

export const ListBoxPicker = () => {
  const { setArticleCategory } = useActions();
  const { data } = useTypedSelector((state) => state.editorPage);

  const [selectedCategory, setSelectedCategory] = useState(data.category ?? ArticleCategory.REVIEWS);

  return (
    <div>
      <h4 className='confirmDialogItemLabel'>Категория</h4>
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        {({ open }) => (
          <div className='listBox'>
            <Listbox.Button className={clsx('listBoxButton', open && 'openListBox')} placeholder='Выбери категорию'>
              {selectedCategory}
              <span className='material-symbols-outlined unfoldMoreIcon'>arrow_drop_down</span>
            </Listbox.Button>
            <Listbox.Options className='listBoxOptions'>
              {categories.map((category) => (
                <Listbox.Option
                  key={category}
                  className='listBoxOption'
                  value={category}
                  onClick={() => setArticleCategory(category)}
                >
                  {({ selected }) => (
                    <div className={clsx(selected && 'selected', 'optionContent')}>
                      {selected && <span className='material-symbols-outlined'>check</span>} {category}
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
