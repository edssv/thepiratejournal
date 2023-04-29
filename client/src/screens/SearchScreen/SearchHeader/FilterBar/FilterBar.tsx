import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState } from 'react';

import Chip from '@/components/common/Chip/Chip';
import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { sortData } from '@/lib/sortData';
import { useGetTagsQuery } from '@/services/article/article.service';

import styles from './FilterBar.module.scss';

export const FilterBar: React.FC = () => {
  const { sort, tag } = useTypedSelector((state) => state.filter);
  const { data } = useGetTagsQuery();

  const getSelectedCategory = () => {
    if (sort === 'views') return sortData[0];
    if (sort === 'recent') return sortData[1];
    if (sort === 'appreciations') return sortData[2];
    return sortData[0];
  };

  const [selectedCategory, setSelectedCategory] = useState(getSelectedCategory());

  const { setTag, setSort } = useActions();

  return (
    <div className={styles.root}>
      <div className={styles.tags}>
        {data?.map((item: string, i: number) => (
          <Chip key={i} selected={item === tag} onClick={() => setTag(item)}>
            {item}
          </Chip>
        ))}
      </div>
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className='listBox'>
          <Listbox.Button className='listBoxButton' placeholder='Выбери категорию'>
            {selectedCategory.name}
            <span className='material-symbols-outlined'>unfold_more</span>
          </Listbox.Button>
          <Listbox.Options className='listBoxOptions'>
            {sortData.map((item) => (
              <Listbox.Option key={item.key} className='listBoxOption' value={item} onClick={() => setSort(item.key)}>
                {({ selected }) => (
                  <div className={clsx(selected && 'selected', 'optionContent')}>
                    {selected && <span className='material-symbols-outlined'>check</span>} {item.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
