import { Fragment, useState } from 'react';
import { Dialog, Menu } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
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
            <AnimatePresence>
                {isOpen && (
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="MenuDropdown">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <Dialog.Overlay className="MenuDropdownOverlay" />
                        </motion.div>
                        <motion.div style={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 250 }}>
                            <Dialog.Panel className="MenuDropdownPanel">
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
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    ) : (
        <Menu as="div" className="MenuDropdown">
            <Menu.Button as={Button} icon variant="text">
                <span className="material-symbols-outlined">more_vert</span>
            </Menu.Button>
            <div className="MenuDropdownPanel">
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
            </div>
        </Menu>
    );
};
