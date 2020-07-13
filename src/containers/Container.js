import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


export default function AppContainer(props) {
    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Grid
                    item
                    xs={12}
                >
                    {props.children}
                </Grid>
            </Container>
        </React.Fragment>
    );
}