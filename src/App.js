import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Games from "./Components/Games";
import Game from "./Components/Game";
import PC from "./Components/PC";
import PlayStation from "./Components/PlayStation";
import Xbox from "./Components/Xbox";
import Nintendo from "./Components/Nintendo";
import Upcoming from "./Components/Upcoming";
import Login from "./Components/Login";
import SignUp from "./Components/signUp";
import Favorites from "./Components/Favorites";
import Results from "./Components/Results";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Games} />
                <Route path='/Favorites' component={Favorites}/>
                <Route path='/PC' component={PC}/>
                <Route path='/PlayStation' component={PlayStation}/>
                <Route path='/Xbox' component={Xbox}/>
                <Route path='/Nintendo' component={Nintendo}/>
                <Route path='/Upcoming' component={Upcoming}/>
                <Route path='/Results' component={Results}/>
                <Route path='/login' component={Login}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/:name' component={Game}/>
            </Switch>
        </Router>
    );
}

export default App;
