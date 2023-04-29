import moment from 'moment';
import 'moment/locale/ru';

import Avatar from '@/components/Avatar/Avatar';

import styles from './UserBlock.module.scss';

interface UserBlockProps {
  username: string;
  image: string | undefined;
  createdAt: Date;
}

const UserBlock: React.FC<UserBlockProps> = ({ username, image, createdAt }) => {
  const date = moment(createdAt).format('L');

  return (
    <div className={styles.top}>
      <Avatar imageSrc={image} width={110} />
      <div className={styles.top__wrapper}>
        <div className={styles.top__info}>
          <h3 className={styles.info__headline}>{username}</h3>
          <div className={styles.info__counters}>
            {/* Подписчики: <span>{data.followersCount}</span> */}
          </div>
          <div className={styles.location}>Пиратский корабль</div>
        </div>
        {/* {isOwner && <UploadAvatar />} */}
        {/* {!isOwner && (
          <ButtonFollow username={data.username} hasSubscription={data?.viewer?.hasSubscription} />
      )} */}
      </div>
      <span className={styles.signupDate}>Дата регистрации: {date}</span>
    </div>
  );
};

export default UserBlock;
