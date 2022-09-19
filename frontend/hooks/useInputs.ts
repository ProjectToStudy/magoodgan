import React, { useReducer } from 'react';

interface Action {
    type: string;
    value: {
        name: string;
        value?: string;
        id: string;
        classList: any;
    }
}

const reducer = (state: object, action: Action): any => {
    switch (action.type) {
    case 'CHANGE':
        return {
            ...state,
            [action.value.name]: action.value.value,
        };
    case 'CLICK':
        return {
            ...state,
            [action.value.id]: '',
        };
    // no default
    }
};

const useInputs = (initialForm: object) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: 'CHANGE', value: e.target }); };
    const onDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => { dispatch({ type: 'CLICK', value: (e.target as HTMLButtonElement) }); };
    return [state, onChange, onDeleteBtnClick];
};

export default useInputs;
