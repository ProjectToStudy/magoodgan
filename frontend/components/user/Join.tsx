import React from 'react';
import { InputComponentProps, JoinComponentProps } from '../../types/user';

import styles from '../../styles/Join.module.scss';

const InputComponent = ({ title, name, item, error, isValid, onDelClick }: InputComponentProps) => {
    return (
        <div className={styles.row}>
            <span className={styles.title_row}>{title}</span>
            <div className={styles.input_area}>
                <input name={name} {...item} required />
                <button type="button" name="erase" id={name} onClick={onDelClick} style={{ display: (item.value !== '' && !isValid) ? 'inherit' : 'none' }} />
                <button type="button" name="check" style={{ display: (isValid && item.value !== '') ? 'inherit' : 'none' }} />
            </div>
            <span className={styles.error_row}>{error}</span>
        </div>
    );
};

const JoinComponent: React.FunctionComponent<JoinComponentProps> = (props) => {
    const { items, errors, isValid, onChange, onFocus, onBlur,
        onDeleteBtnClick, onSubmitClick } = props;
    const { userIdItem, passwordItem, confirmPasswordItem, emailItem } = items;

    return (
        <main className={styles.content}>
            <h2>회원가입</h2>
            <div className={styles.row_group}>
                <InputComponent
                    title="아이디"
                    name="userId"
                    item={{ ...userIdItem, onChange, onFocus, onBlur }}
                    error={errors.userId}
                    isValid={isValid.userId}
                    onDelClick={onDeleteBtnClick}
                />
                <InputComponent
                    title="비밀번호"
                    name="password"
                    item={{ ...passwordItem, onChange, onFocus, onBlur }}
                    error={errors.password}
                    isValid={isValid.password}
                    onDelClick={onDeleteBtnClick}
                />
                <InputComponent
                    title="비밀번호 확인"
                    name="confirmPassword"
                    item={{ ...confirmPasswordItem, onChange, onFocus, onBlur }}
                    error={errors.confirmPassword}
                    isValid={isValid.confirmPassword}
                    onDelClick={onDeleteBtnClick}
                />
                <InputComponent
                    title="이메일"
                    name="email"
                    item={{ ...emailItem, onChange, onFocus, onBlur }}
                    error={errors.email}
                    isValid={isValid.email}
                    onDelClick={onDeleteBtnClick}
                />
                <button type="submit" name="submit" onClick={onSubmitClick} className={styles.submit}>마굿간 가족되기</button>
            </div>
        </main>
    );
};

export default JoinComponent;
