import { Button, Variant } from '../../../components';

interface ButtonShareProps {
    variant?: Variant;
}

export const ButtonShare: React.FC<ButtonShareProps> = ({ variant }) => {
    return (
        <Button icon variant={variant ?? 'text'}>
            <span className="material-symbols-outlined">share</span>
        </Button>
    );
};
