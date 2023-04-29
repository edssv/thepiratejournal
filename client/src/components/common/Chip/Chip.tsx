import styles from './Chip.module.scss';

interface ChipProps {
  selected?: boolean;
}

const Chip: React.FC<
  React.PropsWithChildren<ChipProps & React.HTMLAttributes<HTMLButtonElement>>
> = ({ children, selected, ...props }) => (
  <button className={`${styles.root} ${selected ? styles.selected : ''} `} {...props}>
    {selected && <span className={`${styles.icon} material-symbols-outlined`}>check</span>}
    {children}
  </button>
);

export default Chip;
