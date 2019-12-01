import React,{Component} from 'react';
import './FollowUserApp.css';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';

class FollowUserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser:localStorage.getItem("loggedInUser")
    }
    this.saveUser = this.saveUser.bind(this);
  }

  saveUser(userId) {
      localStorage.setItem("loggedInUser",userId);
      this.setState({loggedInUser:userId});
  }

  render() {
    return ( 
      <div>
        {!this.state.loggedInUser ? (
          <LoginPage saveUser={this.saveUser}/>
          ) : (
          <UserPage loggedInUser={this.state.loggedInUser}/> 
          )
        }
      </div>
    );
  }
}


export default FollowUserApp;
