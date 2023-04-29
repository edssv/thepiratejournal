import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ArticleType } from '@/lib/enums';

const typeArticle = [ArticleType.ARTICLE, ArticleType.BLOG];

const TypePicker = () => {
  const { setArticleType } = useActions();
  const { articleType } = useTypedSelector((state) => state.editorPage);

  const [selectedType, setSelectedType] = useState(articleType ?? articleType);

  return (
    <div>
      <h4 className='confirmDialogItemLabel'>Раздел</h4>
      <Listbox defaultValue={selectedType} value={selectedType} onChange={setSelectedType}>
        {({ open }) => (
          <div className='listBox'>
            <Listbox.Button
              className={clsx('listBoxButton', open && 'openListBox')}
              placeholder='Выбери категорию'
              value={selectedType}
            >
              {selectedType}
              <span className='material-symbols-outlined unfoldMoreIcon'>arrow_drop_down</span>
            </Listbox.Button>
            <Listbox.Options className='listBoxOptions'>
              {typeArticle.map((type) => (
                <Listbox.Option key={type} className='listBoxOption' value={type} onClick={() => setArticleType(type)}>
                  {({ active, selected }) => (
                    <div
                      className={`${selected && 'selected'}
                        optionContent
                        `}
                    >
                      {selected && <span className='material-symbols-outlined'>check</span>} {type}
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

export default TypePicker;
