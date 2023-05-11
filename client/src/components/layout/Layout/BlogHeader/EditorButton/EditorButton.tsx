import { useRouter } from 'next/router';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const EditorButton: React.FC = () => {
  const { push } = useRouter();

  return (
    <Button icon color='secondary' onClick={() => push(getPublicUrl.editor())}>
      <span className='material-symbols-outlined'>edit</span>
    </Button>
  );
};

export default EditorButton;
