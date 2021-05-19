import  React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
<<<<<<< Updated upstream
import signup from './signup'
import main from './Main'
import PrivateRoute from './PrivateRoute';
=======
import Schedule from './scheadule/Schedule';
import { profile } from './profile/index.js';

>>>>>>> Stashed changes

const app = () => {
    return (
        <div>
<<<<<<< Updated upstream
        <BrowserRouter >       
        <Route exact path="/signup" component={signup} />
        <PrivateRoute path="/" component={main}/>
=======
        <BrowserRouter >
        
        <Route path="/calendar" handler={Schedule} />
        <Route path="/profile" handler={profile}/>
>>>>>>> Stashed changes
        </BrowserRouter>
        </div>
    )
}

export default app
