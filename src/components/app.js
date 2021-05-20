import  React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import signup from './signup'
import main from './Main'
import PrivateRoute from './PrivateRoute';

const app = () => {
    return (
        <div>
        <BrowserRouter >       
        <Route exact path="/signup" component={signup} />
        <PrivateRoute path="/" component={main}/>
        </BrowserRouter>
        </div>
    )
}

export default app
