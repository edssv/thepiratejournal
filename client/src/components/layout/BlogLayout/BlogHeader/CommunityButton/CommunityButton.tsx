import { useRouter } from 'next/router';

import { getPublicUrl } from '@/lib/publicUrlBuilder';
import Button from '@/components/common/Button/Button';

const CommunityButton: React.FC = () => {
  const { push } = useRouter();

  return (
    <Button onClick={() => push(getPublicUrl.community())} icon color="secondary">
      <span className="material-symbols-outlined">local_library</span>
    </Button>
  );
};

export default CommunityButton;
