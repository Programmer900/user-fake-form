import React, {Component} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Input from "../components/UI/Input/Input"
import SelectInput from "../components/UI/Select/Select"

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import '../styles/Form.scss'
import { green } from '@material-ui/core/colors';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            male: '',
            formControls: {
                firstName: {
                    name: "firstName",
                    id: "first-name",
                    variant: "outlined",
                    label: "Фамилия",
                    value: '',
                    type: 'text',
                    errorMessage: "Поле является обязательным",
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        text: true,
                        minLength: 2
                    }
                },
                lastName: {
                    name: "lastName",
                    id: "last-name",
                    variant: "outlined",
                    label: "Имя",
                    value: '',
                    type: 'text',
                    errorMessage: "Поле является обязательным",
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        text: true,
                        minLength: 2
                    }
                },
                date: {

                },
                phone: {

                },
                email: {

                }
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = (event) => {
        this.setState({male: event.target.value});
    };

    theme = createMuiTheme({
        palette: {
            primary: green,
        },
    })

    optionsSelect = {
        name: 'Пол',
        items: ['Мужской', 'Женский']
    }


    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true

        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length > validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler(e, label) {
        const formControls = { ...this.state.formControls }
        const control = {...formControls[label]}
        control.value = e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[label] = control

        this.setState({formControls})
        return console.log(e, label);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <ThemeProvider theme={this.theme}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Input
                                    id={this.state.formControls.firstName.id}
                                    variant={this.state.formControls.firstName.variant}
                                    label={this.state.formControls.firstName.label}
                                    required={this.state.formControls.firstName.validation.required}
                                    valid={this.state.formControls.firstName.valid}
                                    touched={this.state.formControls.firstName.touched}
                                    errorMessage={this.state.formControls.firstName.errorMessage}
                                    shouldValidate={!!this.state.formControls.firstName.validation}
                                    fullWidth
                                    onChange={e => this.onChangeHandler(e, this.state.formControls.firstName.name)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    id={this.state.formControls.lastName.id}
                                    variant={this.state.formControls.lastName.variant}
                                    label={this.state.formControls.lastName.label}
                                    required={this.state.formControls.lastName.validation.required}
                                    valid={this.state.formControls.lastName.valid}
                                    touched={this.state.formControls.lastName.touched}
                                    errorMessage={this.state.formControls.lastName.errorMessage}
                                    shouldValidate={!!this.state.formControls.lastName.validation}
                                    fullWidth
                                    onChange={e => this.onChangeHandler(e, this.state.formControls.lastName.name)}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    id="middle-name"
                                    variant="outlined"
                                    label="Отчество"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectInput
                                    id="male"
                                    value={this.state.male}
                                    label="Пол"
                                    fullWidth
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: "male",
                                        id: "male",
                                    }}
                                    className="fullHeight"
                                    options={this.optionsSelect}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input
                                    id="date"
                                    label="Дата рождения"
                                    type="date"
                                    defaultValue="Дата рождения"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input
                                    id="phone"
                                    variant="outlined"
                                    label="Моб. телефон"
                                    type="phone"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input
                                    id="email"
                                    type="email"
                                    variant="outlined"
                                    label="Email"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    id="address"
                                    variant="outlined"
                                    label="Адрес постоянной регистрации"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    id="work-name"
                                    variant="outlined"
                                    label="Название работодателя"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} className={"text-right"}>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    className="btn-send"
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
