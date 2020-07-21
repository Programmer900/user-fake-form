import React, {Component} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Input from "../components/UI/Input/Input"
import SelectInput from "../components/UI/Select/Select"
import is from 'is_js'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import '../styles/Form.scss'
import { green } from '@material-ui/core/colors';

function validationPhone(phone) {
    const re = new RegExp(`^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$`)
    console.log(re.test(phone))
    return re.test(phone)
}

class Form extends Component {

    constructor(props) {
        super(props)
    }

    //Состояние
    state = {
        isFormValid: false,
        formControls: {
            firstName: {
                type: 'text',
                name: "firstName",
                id: "first-name",
                variant: "outlined",
                label: "Фамилия*",
                value: '',
                errorMessage: "Поле является обязательным",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    text: true,
                    minLength: 2
                },
                grid: 12
            },
            lastName: {
                type: 'text',
                name: "lastName",
                id: "last-name",
                variant: "outlined",
                label: "Имя*",
                value: '',
                errorMessage: "Поле является обязательным",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    text: true,
                    minLength: 2
                },
                grid: 12
            },
            middleName: {
                type: 'text',
                name: "middleName",
                id: "middle-name",
                variant: "outlined",
                label: "Отчество",
                valid: true,
                value: '',
                grid: 12
            },
            male: {
                male: '',
                type: 'select',
                name: "male",
                id: "male",
                label: "Пол",
                className: "fullHeight",
                options: {
                    name: 'Пол',
                    items: ['Мужской', 'Женский']
                },
                inputProps: {
                    name: "male",
                    id: "male",
                },
                valid: true,
                value: '',
                grid: 6,

            },
            date: {
                type: 'date',
                name: "date",
                id: "date",
                label: "Дата рождения*",
                InputLabelProps: {
                    shrink: true,
                },
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
                grid: 6
            },
            phone: {
                type: 'text',
                name: "phone",
                id: "phone",
                variant: "outlined",
                label: "Моб. телефон*",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    phone: true
                },
                grid: 6
            },
            email: {
                type: 'text',
                name: "email",
                id: "email",
                variant: "outlined",
                label: "E-Mail",
                value: '',
                errorMessage: "Введите корректный email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                },
                grid: 6
            },
            address: {
                type: 'text',
                name: "address",
                id: "address",
                variant: "outlined",
                label: "Адрес постоянной регистрации",
                valid: true,
                value: '',
                grid: 12
            },
            work_name: {
                type: 'text',
                name: "work_name",
                id: "work_name",
                variant: "outlined",
                label: "Название работодателя",
                valid: true,
                value: '',
                grid: 12
            }
        }
    }

    //Настройки
    theme = createMuiTheme({
        palette: {
            primary: green,
        },
    })

    //Ф Валидации
    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true

        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            isValid = is.email(value) && isValid
        }

        if(validation.phone) {
            isValid = validationPhone(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length > validation.minLength && isValid
        }

        return isValid
    }

    //Слушатели
    handleSubmit = (e) => {
        e.preventDefault()
        const state = {...this.state.formControls}

        var result = "";

        for (let items in state) {
            if(state[items].value !== '') {
                result += state[items].label + ":   " + state[items].value + "\n";
            }
        }
        alert(result)
        console.log(result)
    }


    // ===================ВОТ В ЭТОЙ ФУНКЦИИ НУЖНО РАЗДЕЛИТЬ УСЛОВИЯ !!! =======================

    onChangeHandler(e, label) {
        const formControls = { ...this.state.formControls }
        const control = {...formControls[label]}
        console.log(control)

        let isFormValid = true

        if(!control.hasOwnProperty('valid')) {
            control.value = e.target.value
            formControls[label] = control
        } else {
            control.value = e.target.value
            control.touched = true
            control.valid = this.validateControl(control.value, control.validation)
            formControls[label] = control
        }

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }
    //Ф генерации полей
    renderInputs() {
       return Object.keys(this.state.formControls).map((controlName, index) => {
           const control = this.state.formControls[controlName]

                switch (control.type) {
                        case 'text':
                        return (
                            <Grid item xs={control.grid} key={controlName + index}>
                            <Input
                                type={control.type}
                                variant={control.variant}
                                label={control.label}
                                required={control.required}
                                valid={control.valid}
                                touched={control.touched}
                                errorMessage={control.errorMessage}
                                shouldValidate={!!control.validation}
                                onChange={e=>this.onChangeHandler(e, controlName)}
                                fullwidth
                            />
                            </Grid>
                        )
                        break;
                        case 'select':
                        return (
                            <Grid item xs={control.grid} key={controlName + index}>
                                <SelectInput
                                    type='text'
                                    value={control.value}
                                    label={control.label}
                                    fullWidth
                                    inputProps={control.inputProps}
                                    className={control.className}
                                    options={control.options}
                                    onChange={event => this.onChangeHandler(event, controlName)}
                                />
                            </Grid>
                        )
                        break;
                        case 'date':
                        return (
                            <Grid item xs={control.grid} key={controlName + index}>
                                <Input
                                    type='date'
                                    value={control.value}
                                    required={control.required}
                                    valid={control.valid}
                                    touched={control.touched}
                                    errorMessage={control.errorMessage}
                                    shouldValidate={!!control.validation}
                                    label={control.label}
                                    InputLabelProps={control.InputLabelProps}
                                    className={control.className}
                                    onChange={event => this.onChangeHandler(event, controlName)}
                                />
                            </Grid>
                        )
                        break;

                }
        })
    }

    //Рендер функция
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <ThemeProvider theme={this.theme}>
                        <Grid container spacing={3}>
                            {this.renderInputs()}
                            <Grid item xs={12} className={"text-right"}>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    className="btn-send"
                                    disabled={!this.state.isFormValid}
                                >
                                    Отправить
                                </Button>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </form>
            </div>
        )
    };
}

export default Form;
