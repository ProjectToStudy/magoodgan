import React from 'react';

export type InputComponentProps = {
    title: string;
    name: string;
    item: {
        type?: string;
        value: string;
        onChange(): void;
        onFocus(): void;
        onBlur(e: React.FocusEvent<HTMLInputElement>): void;
    };
    error: string;
}

export type JoinComponentProps = {
    items: {
        userIdItem: InputComponentProps['item'];
        passwordItem: InputComponentProps['item'];
        confirmPasswordItem: InputComponentProps['item'];
        emailItem: InputComponentProps['item'];
    };
    errors: {
        userId: string;
        password: string;
        confirmPassword: string;
        email: string;
    };
}

export type JoinDuplicatedBody = {
    userId?: string;
    email?: string;
}
export type JoinAPIBody = {
    userId: string;
    password: string;
    email: string;
}
