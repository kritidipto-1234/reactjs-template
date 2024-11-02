
import styles from './styles/Modal.module.scss';

type ModalProps = {
    children: React.ReactNode;
    closeModal: () => void;
}
const Modal = ({children,closeModal}:ModalProps) => {
    return <div className={styles.Modal}>
        {children}
    </div>
}

export default Modal;