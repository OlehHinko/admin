import React, { Fragment } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Switch} from 'react-router';
import Container from 'react-bootstrap/Container';

//component
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Resources from './components/Resources/Resources';
import Users from './components/Users/Users';
import Signin from './components/Signin/Signin';
import EditUser from './components/Users/User/EditUser/EditUser';
import ViewUser from './components/Users/User/ViewUser/ViewUser';

//style
import './App.scss';


class Navigation extends React.Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Header />
                    <Container>
                        <Switch>
                            <Route path='/login' component={Signin}/>
                            <PrivateRoute path='/resources' component={Resources}/>
                            <PrivateRoute path='/users' component={Users}/>
							<PrivateRoute path='/user/view/:id' component={ViewUser}/>
                            <PrivateRoute path='/user/edit/:id' component={EditUser}/>
                            <PrivateRoute path='/' component={Home}/>
                        </Switch>
                    </Container>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default Navigation;

function PrivateRoute({component: Component, ...rest}) {
    const fakeAuth = !!localStorage.getItem('isLogined');
    return (
        <Route
            {...rest}
            render={props => fakeAuth ? <Component {...props} /> : <Redirect to={{pathname: "/login"}}/>}
        />
    );
}
