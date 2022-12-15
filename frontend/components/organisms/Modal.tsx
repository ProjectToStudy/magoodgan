import styles from '../../styles/Organisms.module.scss';

interface Props {
    onConfirmClick: () => void;
}

const Modal = ({ onConfirmClick }: Props) => {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_inner}>
                <div className={styles.text_wrap}>
                    <p>아이디 또는 비밀번호가 일치하지 않아요</p>
                    <span>
                        만약 같은 문제가 반복된다면
                        <br />
                        운영진에게 문의해주세요.
                    </span>
                </div>
                <button type="button" onClick={onConfirmClick}>확인</button>
            </div>
        </div>
    );
};

export default Modal;
