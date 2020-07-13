import React, {Component} from 'react';
import Select from '@material-ui/core/Select';

const SelectInput = props => {
    const inputProps = props.inputProps || ''
    const options = props.options;
    return (
        <div className={'fullHeight Select'}>
            <Select
                id={props.id}
                native
                value={props.value}
                label="Пол"
                fullWidth
                onChange={props.onChange}
                inputProps={inputProps}
                className={props.className}
            >
                <option value="">{options.name}</option>
                {options.items.map(o => <option key={`${props.id}+${Math.random()}`} value={o}>{o}</option>)}
            </Select>
            <span className={'errorMessage'}>{props.errorMessage}</span>
        </div>
    )
}

export default SelectInput;