import styles from './FacebookButton.module.scss';

const FacebookButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => (
  <button className={styles.root} {...props}>
    <svg height='16' viewBox='0 0 16 16' width='16' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16,8.049A8,8,0,1,0,6.75,16V10.376H4.719V8.049H6.75V6.276A2.832,2.832,0,0,1,9.772,3.144a12.235,12.235,0,0,1,1.791.157V5.282H10.554A1.16,1.16,0,0,0,9.25,6.54V8.049h2.219l-.355,2.327H9.25V16A8.036,8.036,0,0,0,16,8.049Z'
        data-name='new facebook logo'
        fill='#fff'
        id='new_facebook_logo'
      />
    </svg>{' '}
    <span>Продолжить с Facebook</span>
  </button>
);

export default FacebookButton;
