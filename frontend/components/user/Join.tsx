import React from 'react';
import { InputComponentProps, JoinComponentProps } from '../../types/join';

import styles from '../../styles/Join.module.scss';

const InputComponent = ({ title, name, item, error }: InputComponentProps) => {
    return (
        <div className={styles.row}>
            <span className={styles.title_row}>{title}</span>
            <input name={name} {...item} required />
            <span className={styles.error_row}>{error}</span>
        </div>
    );
};

const JoinComponent: React.FunctionComponent<JoinComponentProps> = (props) => {
    const { items, errors } = props;
    const { userIdItem, passwordItem, confirmPasswordItem, emailItem } = items;

    return (
        <main className={styles.content}>
            <h2>회원가입</h2>
            <div className={styles.row_group}>
                <InputComponent title="아이디" name="userId" item={userIdItem} error={errors.userId} />
                <InputComponent title="비밀번호" name="password" item={passwordItem} error={errors.password} />
                <InputComponent title="비밀번호 확인" name="confirmPassword" item={confirmPasswordItem} error={errors.confirmPassword} />
                <InputComponent title="이메일" name="email" item={emailItem} error={errors.email} />
                <button type="submit" name="submit" className={styles.submit}>마굿간 가족되기</button>
            </div>
        </main>
    );
};

export default JoinComponent;
