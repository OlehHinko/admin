import React, {Fragment} from 'react';
import {Table, Button} from 'react-bootstrap';
import { withRouter } from "react-router";

import getUsers from './../../../../redux/state';

//style
import './ViewUser.scss';

class ViewUser extends React.Component  {
	constructor(props){
		super(props);
		this.state = {
			user: getUsers().find((user) => {
                return user.id === parseInt(this.props.match.params.id);
            })
		}
	}
	
	editUser = (user) => {
		this.props.history.push(`/user/edit/${user.id}`);
    };

	render() {
		const {user} = this.state;
		return (
			<Fragment>
               <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                    </tr>
                    </tbody>
                </Table>
                <Button variant="primary"
                        type="submit"
                        className='user-btn-edit'
                        onClick={() => this.editUser(user)}
                >
                    Edit
                </Button>
			</Fragment>
        );
	}
    
}

export default withRouter(ViewUser);