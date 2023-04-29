import clsx from 'clsx';
import React from 'react';

import styles from './VisibilityToggle.module.scss';

type VisibilityToggleProps = {
  passwordEye: boolean;
  setPasswordEye: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties | undefined;
};

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  passwordEye,
  setPasswordEye,
  style
}) => (
  <button
    className={clsx(styles.root, 'icon-center')}
    style={style}
    onClick={() => setPasswordEye(!passwordEye)}
  >
    {passwordEye ? (
      <svg aria-hidden='true' focusable='false' role='img' viewBox='0 0 36 36'>
        <path d='M24.613 8.58A14.972 14.972 0 0 0 18 6.937c-8.664 0-15.75 8.625-15.75 11.423 0 3 7.458 10.7 15.686 10.7 8.3 0 15.814-7.706 15.814-10.7 0-2.36-4.214-7.341-9.137-9.78zM18 27.225A9.225 9.225 0 1 1 27.225 18 9.225 9.225 0 0 1 18 27.225z' />
        <path d='M20.667 18.083A2.667 2.667 0 0 1 18 15.417a2.632 2.632 0 0 1 1.35-2.27 4.939 4.939 0 0 0-1.35-.209A5.063 5.063 0 1 0 23.063 18a4.713 4.713 0 0 0-.175-1.2 2.625 2.625 0 0 1-2.221 1.283z' />
      </svg>
    ) : (
      <svg role='img' viewBox='0 0 36 36'>
        <path d='M14.573 9.44A9.215 9.215 0 0 1 26.56 21.427l2.945 2.945c2.595-2.189 4.245-4.612 4.245-6.012 0-2.364-4.214-7.341-9.137-9.78A14.972 14.972 0 0 0 18 6.937a14.36 14.36 0 0 0-4.989.941z' />
        <path d='M33.794 32.058L22.328 20.592A5.022 5.022 0 0 0 23.062 18a4.712 4.712 0 0 0-.174-1.2 2.625 2.625 0 0 1-2.221 1.278A2.667 2.667 0 0 1 18 15.417a2.632 2.632 0 0 1 1.35-2.27 4.945 4.945 0 0 0-1.35-.209 5.022 5.022 0 0 0-2.592.734L3.942 2.206a.819.819 0 0 0-1.157 0l-.578.579a.817.817 0 0 0 0 1.157l6.346 6.346c-3.816 2.74-6.3 6.418-6.3 8.072 0 3 7.458 10.7 15.686 10.7a16.455 16.455 0 0 0 7.444-1.948l6.679 6.679a.817.817 0 0 0 1.157 0l.578-.578a.818.818 0 0 0-.003-1.155zM18 27.225a9.2 9.2 0 0 1-7.321-14.811l2.994 2.994A5.008 5.008 0 0 0 12.938 18 5.062 5.062 0 0 0 18 23.063a5.009 5.009 0 0 0 2.592-.736l2.994 2.994A9.144 9.144 0 0 1 18 27.225z' />
      </svg>
    )}
  </button>
);
