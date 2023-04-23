import React, { PropsWithChildren, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { useCreateLikeMutation, useRemoveLikeMutation } from '@/gql/__generated__';
import { useAuth } from '@/hooks';
import { articleDataSelector, viewerSelector } from '@/store';
import Button, { ButtonColor, Variant } from '@/components/common/Button/Button';
import Snackbar from '@/components/common/Snackbar/Snackbar';

const Tippy = dynamic(() => import('@/components/common/Tippy/Tippy'), { ssr: false });
interface IsLikeProps {
  tooltipPosition?: any;
  width?: string | number;
  variant?: Variant;
  color?: ButtonColor;
  icon?: boolean;
}
export const ButtonLike: React.FC<PropsWithChildren<IsLikeProps>> = ({
  children,
  tooltipPosition,
  variant = 'text',
  color,
  icon = false,
}) => {
  const { user } = useAuth();
  const article = useSelector(articleDataSelector);
  const { isLike } = useSelector(viewerSelector);
  const [isOpen, setIsOpen] = useState(false);

  const [createLike] = useCreateLikeMutation();
  const [removeLike] = useRemoveLikeMutation();

  const handleLike = async () => {
    if (isLike) {
      await removeLike({ variables: { articleId: article.id } });
    } else {
      await createLike({ variables: { articleId: article.id } });
    }

    setIsOpen(true);
  };

  if (!user) {
    return (
      <>
        <Tippy
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          tooltipPosition={tooltipPosition}
          title={'Добавляй в избранное'}
          description="Чтобы добавлять статьи в понравившиеся, войди в аккаунт."
        >
          <Button onClick={() => setIsOpen(!isOpen)} isActive={isOpen} variant={variant}>
            <span className="material-symbols-outlined">favorite</span>
            {children}
          </Button>
        </Tippy>
      </>
    );
  }
  return (
    <>
      <Button onClick={handleLike} color={color} variant={variant}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isLike ? '"FILL" 1' : '' }}>
          favorite
        </span>
        {children ?? null}
      </Button>

      <Snackbar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isLike ? 'Добавлено в любимые статьи' : 'Удалено из любимых статей'}
      </Snackbar>
    </>
  );
};
