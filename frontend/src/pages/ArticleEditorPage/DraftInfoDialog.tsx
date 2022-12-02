import React from 'react';
import {
    ActionButton,
    Button,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Heading,
    Text,
} from '@adobe/react-spectrum';
import { ButtonProgress } from '../../components';

interface DraftInfoDialogProps {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isDisabled: boolean;
    onPress: (data: object) => void;
}

export const DraftInfoDialog: React.FC<DraftInfoDialogProps> = ({
    isLoading,
    isSuccess,
    isError,
    isDisabled,
    onPress,
}) => {
    return (
        <DialogTrigger type="tray">
            <ButtonProgress
                onPress={onPress}
                isLoading={isLoading}
                isDisabled={isDisabled}
                variant="primary">
                Сохранить как черновик
            </ButtonProgress>

            <Dialog>
                <Heading>Черновик сохранен!</Heading>
                <Divider />

                <Content>
                    <Text>Ты можешь найти его в разделе "Черновики" в cвоем профиле.</Text>
                </Content>
            </Dialog>
            {/* <div className="tippy">
                <p>Ты можешь найти его в разделе "Черновики" в cвоем профиле.</p>
            </div> */}
        </DialogTrigger>
    );
};
