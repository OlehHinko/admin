import React from 'react';
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

import getUsers from './../../redux/state';

//style
import './Users.scss';

class Users extends React.Component {

    render() {
        const users = getUsers();
        return (
            <div className="users">
                <h2>Users</h2>
                <ListGroup as="ul">
                    {users && users.map((user, key) => (
                            <ListGroup.Item as="li" key={key}>
                                <Link to={`user/view/${user.id}`}>{user.name} {user.surname}</Link>
                            </ListGroup.Item>
                        )
                    )}
                </ListGroup>
            </div>
        );
    }
}

export default Users;

