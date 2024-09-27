import IconArrowDown from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/arrow-down.tsx"
import Modal from "site/components/ui/Modal.tsx";
import { useState } from 'preact/hooks';

interface Props {
    text: string;
    icon: boolean;
    class?: string;
}

function ModalButton(
  { text, icon, ...otherProps }: Props,
) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <button
                {...otherProps}
                onClick={openModal}
            >
                {icon && <IconArrowDown />} {text}
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default ModalButton;
