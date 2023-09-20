import { FC } from 'react'

import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    children: React.ReactNode;
}

const Modal:FC<ModalProps> = ({ isOpen, onChange, children}) => {
  return (
    <Dialog.Root
        open={isOpen}
        defaultOpen={isOpen}
        onOpenChange={onChange}
    >
        <Dialog.Portal>
            <Dialog.Overlay
                className='modal-overlay'
            />
            <Dialog.Content
                className='modal-content animate-fade'
            >
                {/* <Dialog.Title className='text-center text-white text-2xl md:text-left font-bold mb-2'>{title}</Dialog.Title>
                <Dialog.Description className='text-center md:text-left text-slate-300 text-sm'>{description}</Dialog.Description> */}
                <div>
                    {children}
                </div>
                <Dialog.Close asChild>
                    <button className='modal-close-btn'>
                        <IoMdClose/>
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal