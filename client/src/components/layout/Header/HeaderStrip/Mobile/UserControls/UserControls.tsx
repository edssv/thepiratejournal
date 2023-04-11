import { useState } from 'react';

import NotificationButton from '../../../NotificationButton/NotificationButton';
import NotificationBlock from '../../../NotificationBlock/NotificationBlock';

import { useAuth } from '@/hooks';

const UserControls = () => {
  const { user } = useAuth();
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);

  if (user) {
    return (
      <>
        <NotificationButton isOpenNotifications={isOpenNotifications} setIsOpenNotifications={setIsOpenNotifications} />
        <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} />
      </>
    );
  }
  return null;
};

export default UserControls;
