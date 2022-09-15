import React, { useReducer } from 'react';

interface Action {
    type: string;
    value: {
        name: string;
        value: string;
        classList: any
    }
}

const reducer = (state: object, action: Action): any => {
    switch (action.type) {
    case 'CHANGE':
        return {
            ...state,
            [action.value.name]: action.value.value,
        };
    case 'FOCUS':
        action.value.classList.add('focus');
        return state;
    // no default
    }
};

const useInputs = (initialForm: object) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch({ type: 'CHANGE', value: e.target }); };
    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { dispatch({ type: 'FOCUS', value: e.target }); };
    return [state, onChange, onFocus];
};

export default useInputs;
