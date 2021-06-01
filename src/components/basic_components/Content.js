import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Forgot from '../Forgot';
import ResetPassword from '../ResetPassword';
import ChangePassword from '../ChangePassword';
import ImportUsersForm from '../import_users/ImportUsersForm';

function Content() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/forgot_password" component={Forgot} />
                <Route exact path="/reset_password" component={ResetPassword} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/import-users" component={ImportUsersForm} />
            </Switch>
        </div>
    )
}

export default Content
