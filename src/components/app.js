import  React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Navbar} from './navigationbar/Navbar.js'
import Schedule from '../Schedule';


const app = () => {
    return (
        <div>
        <Navbar/>
        <BrowserRouter >
        
        <Route path="/calendar" handler={Schedule} />
        <Route path="/profile"/>
        </BrowserRouter>
        </div>
    )
}

export default app
