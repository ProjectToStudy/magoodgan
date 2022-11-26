import { FocusEvent, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link';
import styles from '../../styles/Login.module.scss';

interface Props {
    inputValue: {
        userId: string;
        password: string;
    },
    isFocus: {
        userId: boolean;
        password: boolean;
    }
    isValid: {
        userId: boolean;
        password: boolean;
    }
    error: {
        userId: string;
        password: string;
    }
    onFocus: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onDelBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
    onSubmit: () => void;
}

const LoginComponent = ({
    inputValue, isFocus, isValid, error, onFocus, onBlur, onInputChange, onDelBtnClick, onSubmit,
}: Props) => {
    const { userId, password } = inputValue;

    return (
        <main className={styles.content}>
            <div className={styles.banner}>
                <img src="/images/login-banner.jpg" />
            </div>
            <div className={styles.login_container}>
                <div className={styles.login_inner}>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_container}>
                            <input
                                type="text"
                                name="userId"
                                value={userId}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onChange={onInputChange}
                                placeholder="아이디"
                                className={`${error.userId !== '' && styles.error}`}
                            />
                            {isFocus.userId && <button type="button" id="userId" name="delete" onClick={onDelBtnClick} />}
                            {isValid.userId && <img src="/images/check_black.svg" alt="valid" />}
                            <span className={styles.error_msg}>{error.userId}</span>
                        </div>
                        <div className={styles.input_container}>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onChange={onInputChange}
                                placeholder="비밀번호"
                                className={`${error.password !== '' && styles.error}`}
                            />
                            {isFocus.password && <button type="button" id="password" name="delete" onClick={onDelBtnClick} />}
                            {isValid.password && <img src="/images/check_black.svg" alt="valid" />}
                            <span className={styles.error_msg}>{error.password}</span>
                        </div>
                    </div>
                    <div className={styles.button_wrap}>
                        <button type="button" name="submit" onClick={onSubmit}>로그인</button>
                        <button type="button" name="kakao">카카오로 로그인</button>
                        <button type="button" name="naver">네이버로 로그인</button>
                        <div>
                            <Link href="/">아이디/비밀번호 찾기</Link>
                            <Link href="/user/join">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginComponent;
