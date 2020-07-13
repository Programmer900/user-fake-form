import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import "./Input.scss"

function isInvalid({valid, touched, shouldValidate}) {
 return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const InputLabelProps = props.InputLabelProps || null

    return (
        <div className={'Input'}>
            <TextField
                id={props.id}
                type={inputType}
                variant={props.variant}
                label="Фамилия"
                label={props.label}
                InputLabelProps={InputLabelProps}
                fullWidth
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span className={'errorMessage'}>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }
        </div>
    );
}

export default Input;