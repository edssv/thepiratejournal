import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useMediaPredicate } from 'react-media-hook';
import { Button } from '../../../components';
import { useArticle } from '../../../hooks';

interface MoreButtonDialogProps {
    item: any;
    index: number;
    removeComment: () => void;
}

export const MoreButtonDialog = ({ item, index, removeComment }: MoreButtonDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { article } = useArticle();

    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    return isTablet ? (
        <>
            <Button
                icon
                variant="text"
                onClick={() => {
                    setIsOpen(true);
                }}>
                <span className="material-symbols-outlined">more_vert</span>
            </Button>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <Dialog.Overlay className="MenuDropdownOverlay" />
                    <Dialog.Panel>
                        <div className="MenuDropdownItems elevation-2">
                            <div
                                onClick={() => {
                                    removeComment();
                                    setIsOpen(false);
                                }}
                                className="MenuDropdownItem">
                                <span className="material-symbols-outlined">delete</span>
                                Удалить
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </>
    ) : (
        <Menu as="div" className="MenuDropdown">
            <Menu.Button as={Button} icon variant="text">
                <span className="material-symbols-outlined">more_vert</span>
            </Menu.Button>

            <Menu.Items className="MenuDropdownItems elevation-2">
                <Menu.Item
                    as="div"
                    onClick={() => {
                        removeComment();
                        setIsOpen(false);
                    }}
                    className="MenuDropdownItem">
                    <span className="material-symbols-outlined">delete</span> Удалить
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};
