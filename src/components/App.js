import React, { Component } from "react";
import '../styles/App.scss';

import AppContainer from "../containers/Container"
import Form from "../components/Form"

class App extends Component {
    render() {
        return (
            <AppContainer>
                <h1>User Fake Form</h1>
                <Form />
            </AppContainer>
        );
    }
}

export default App;