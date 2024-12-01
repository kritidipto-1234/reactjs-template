
import styles from './styles/Modal.module.scss';

type ModalProps = {
    children: React.ReactNode;
    closeModal: () => void;
}
const Modal = ({children,closeModal}:ModalProps) => {
    return <div className={styles.Modal}>
        <div className={styles.overlay} onClick={closeModal}></div>
        <div className={styles.content}>{children}</div>
    </div>
}

export default Modal;