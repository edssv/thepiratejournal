import { Button, Variant } from '@/components/Buttons/Button';

interface ButtonShareProps {
    variant?: Variant;
}

export const ButtonShare: React.FC<ButtonShareProps> = ({ variant = 'text' }) => {
    return (
        <Button icon variant={variant}>
            <span className="material-symbols-outlined">share</span>
        </Button>
    );
};
