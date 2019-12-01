import React,{Component} from 'react';
import User from './User';
import axios from 'axios';
import {URL_FOLLOWINGS} from '../Database/urls';
import {URL_GET_USERS} from '../Database/urls';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[],
            followStatus:''
        }
        this.handleFollowStatus = this.handleFollowStatus.bind(this);
    }
   
    handleFollowStatus(user,followStatus) {
        axios.post(URL_FOLLOWINGS,{
            loggedInUser: this.props.loggedInUser,
            user:user,
            followStatus:followStatus})
            .then(res=>{this.getUsersRows()})
            .catch(err=>{
                alert("request to follow/unfollow Failed");
          });
          
    }

    getUsersRows() {
        axios.get(URL_GET_USERS, {
                params: {
                    loggedInUser:this.props.loggedInUser
                }
            })
            .then(p=>this.setState({users:p.data}));
    }

    componentDidMount() {
        this.getUsersRows();
    }

    render() {
        let users = this.state.users.map(user=>(<User name={user.user_name}
                                                        id={user.user_id}
                                                        groupName={user.group_name}
                                                        numOfFollowers={user.followers}
                                                        followStatus={user.follow_status}
                                                        handleFollowStatus={this.handleFollowStatus}
                                                        />)) 
        return (
            <div>
                <table className="users_list">
                <tr>
                    <th>Name</th>
                    <th>Group Name</th> 
                    <th>Number of followers</th>
                    <th></th>
                </tr>
                    {users}
                </table>
            </div>
        );
    }
}
export default UsersList;