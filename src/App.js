import React from 'react';
import { BrowserRouter, Route ,Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

const App = () => {
    return(
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default App;