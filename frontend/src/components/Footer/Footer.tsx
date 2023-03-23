import logo from '../../assets/img/logotype.png';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.root}>
            {/* <div className={styles.squiggle}>
                <svg
                    _ngcontent-eax-c39=""
                    aria-hidden="true"
                    width="100%"
                    height="8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <pattern _ngcontent-eax-c39="" id="a" width="91" height="8" patternUnits="userSpaceOnUse">
                        <g _ngcontent-eax-c39="" clipPath="url(#clip0_2426_11367)">
                            <path
                                _ngcontent-eax-c39=""
                                d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
                                stroke="#E1E3E1"
                                strokeLinecap="square"
                            ></path>
                        </g>
                    </pattern>
                    <rect _ngcontent-eax-c39="" width="100%" height="100%" fill="url(#a)"></rect>
                </svg>
            </div> */}
            {/* <div className={styles.wrapper}>
                <section className={styles.about}>
                    <div className={styles.aboutCompany}>
                        <Link to="/" className={styles.logo}>
                            <img width={40} height={40} src={logo} alt="The Pirate Journal" />
                            <span className={styles.companyName}>The Pirate Journal</span>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda rem cupiditate sapiente
                            cum architecto. Esse obcaecati a explicabo fugit ea assumenda illum consequuntur cupiditate,
                            ex modi ratione, beatae architecto dolore distinctio delectus!
                        </p>
                    </div>
                    <div className={styles.social}>
                        <label htmlFor="ul">Соцсети</label>
                        <ul>
                            <li>
                                <a href="#" className={styles.link}>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className={styles.link}>
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={styles.legal}>
                    <a href="#" className={styles.link}>
                        Обратная связь
                    </a>
                </section>
            </div> */}
        </footer>
    );
};

export default Footer;
