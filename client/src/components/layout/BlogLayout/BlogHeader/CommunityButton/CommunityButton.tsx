import { useRouter } from 'next/router';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const CommunityButton: React.FC = () => {
  const { push } = useRouter();

  return (
    <Button icon color='secondary' onClick={() => push(getPublicUrl.community())}>
      <span className='material-symbols-outlined'>local_library</span>
    </Button>
  );
};

export default CommunityButton;
