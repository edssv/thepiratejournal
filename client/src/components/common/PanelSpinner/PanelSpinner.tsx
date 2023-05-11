import * as React from 'react';

import type { SpinnerProps } from '../Spinner/Spinner';
import { Spinner } from '../Spinner/Spinner';

export interface PanelSpinnerProps extends SpinnerProps {
  height?: number;
}

export const PanelSpinner = React.memo(({ height = 270, style, ...restProps }: PanelSpinnerProps) => (
  <div className='flex items-center justify-center' style={{ height }}>
    <Spinner size='medium' {...restProps} />
  </div>
));

PanelSpinner.displayName = 'PanelSpinner';
