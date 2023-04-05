import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';

import { ArticleType } from '@/lib/enums';
import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const typeArticle = [ArticleType.ARTICLE, ArticleType.BLOG];

const TypePicker = () => {
  const { setArticleType } = useActions();
  const { data, articleType } = useTypedSelector((state) => state.editorPage);

  const [selectedType, setSelectedType] = useState(articleType ?? articleType);

  return (
    <div>
      <h4 className="confirmDialogItemLabel">Раздел</h4>
      <Listbox value={selectedType} defaultValue={selectedType} onChange={setSelectedType}>
        {({ open }) => (
          <div className="listBox">
            <Listbox.Button
              value={selectedType}
              placeholder="Выбери категорию"
              className={clsx('listBoxButton', open && 'openListBox')}
            >
              {selectedType}
              <span className="material-symbols-outlined unfoldMoreIcon">arrow_drop_down</span>
            </Listbox.Button>
            <Listbox.Options className="listBoxOptions">
              {typeArticle.map((type) => (
                <Listbox.Option className="listBoxOption" onClick={() => setArticleType(type)} key={type} value={type}>
                  {({ active, selected }) => (
                    <div
                      className={`${selected && 'selected'}
                        optionContent
                        `}
                    >
                      {selected && <span className="material-symbols-outlined">check</span>} {type}
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
