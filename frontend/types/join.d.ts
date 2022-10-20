import React from 'react';

interface InputProps {
    type?: string;
    value: string;
    placeholder: string;
}

export type InputComponentProps = {
    title: string;
    name: string;
    item: {
        type?: string;
        value: string;
        placeholder: string;
        onChange(): void;
        onFocus(e: React.FocusEvent<HTMLInputElement>): void;
        onBlur(e: React.FocusEvent<HTMLInputElement>): void;
    };
    error: string;
    isValid: boolean;
    onDelClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export type JoinComponentProps = {
    items: {
        userIdItem: InputProps;
        passwordItem: InputProps;
        confirmPasswordItem: InputProps;
        emailItem: InputProps;
    };
    errors: {
        userId: string;
        password: string;
        confirmPassword: string;
        email: string;
    };
    isValid: {
        userId: boolean;
        password: boolean;
        confirmPassword: boolean;
        email: boolean;
    }
    onChange: () => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onDeleteBtnClick: InputComponentProps['onDelClick'];
    onSubmitClick: () => void;
}

export type JoinDuplicatedBody = {
    userId?: string;
    email?: string;
}
export type JoinAPIBody = {
    uid: string;
    password: string;
    email: string;
}
