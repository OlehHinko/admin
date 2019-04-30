import React, {Fragment} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Prompt} from 'react-router';

import {saveUserData} from './../../../../redux/state';
import getUsers from './../../../../redux/state';

//style
import './EditUser.scss';

class EditUser extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			edit: false,
            user: getUsers().find((user) => {
						return user.id === parseInt(this.props.match.params.id)}),
			editedUser: {},
            isBlocking: false,
            isLoading: false
		}
		
			this.state.editedUser = this.state.user
	}

	
	saveData = (e) => {
        e.preventDefault();
        this.setState({isBlocking: false, isLoading: true});
        setTimeout(
            function() {
                saveUserData(this.state.editedUser);
                this.setState({ isLoading: false});
            }
            .bind(this),
            2000
        );
    };

	cancelData = (e) => {
		const {user} = this.state;
		this.setState({editedUser: user});
	};

	handlerChangeField(e) {
        const {name, value} = e.target;
        const { editedUser } = this.state;

        const newUser = {
            ...editedUser,
            [name]: value
        };
        this.setState({editedUser: newUser, isBlocking: true});
    }
	
	render() {
		const { isLoading } = this.state;
		const { isBlocking } = this.state;
		const { editedUser } = this.state;
        return (
			<Fragment>
				<Prompt
                    when={isBlocking}
                    message={() =>
                        `You really want to leave this page without saving data`
                    }
                />
				<Form>
					<Form.Group controlId="formBasicName">
						
						<Form.Control type="text" name='name'
									  onChange={(e) => this.handlerChangeField(e)}
									  value={editedUser.name}/>
					</Form.Group>
					<Form.Group controlId="formBasicSurname">
						<Form.Control type="text" name="surname"
									  onChange={(e) => this.handlerChangeField(e)}
									  value={editedUser.surname}/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Control type="email" name="email"
									  onChange={(e) => this.handlerChangeField(e)}
									  value={editedUser.email}/>
					</Form.Group>
					<Button variant="primary"
							type="submit"
							disabled={isLoading}
							onClick={(e) => this.saveData(e)}>
							{isLoading ? 'Loading�' : 'Save'}
					</Button>
					<Button variant="primary"
							type="button"
							onClick={(e) => this.cancelData(e)}>
							Cancel
					</Button>
				</Form>
			</Fragment>
		);
	}
	
}

export default EditUser;
