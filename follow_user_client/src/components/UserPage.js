import React,{Component} from 'react';
import UsersList from './UsersList';
import axios from 'axios';
import {URL_GET_USER_NAME} from '../Database/urls';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedInUserName:''
        }
    }
    componentDidMount() {
        axios.get(URL_GET_USER_NAME, {
                params: {
                    loggedInUser:this.props.loggedInUser
                }
            })
            .then(p=>p.data[0])
            .then(p=>this.setState({loggedInUserName:p.name}));
    }

    render() {
        return(
            <div className="UserPage">
                {this.state.loggedInUserName ? (
                    <div>
                        <h1 className="row">Welcome {this.state.loggedInUserName} </h1>
                        <div className="row">Choose users to follow:</div>
                        <UsersList loggedInUser={this.props.loggedInUser}  />
                    </div>
                    ) : (
                        <div> Loading... </div>
                    )
                }
            </div>
        );
    }
}

export default UserPage;