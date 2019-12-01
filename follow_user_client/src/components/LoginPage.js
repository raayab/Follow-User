import React,{Component} from 'react';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        };
    }

    handleValue(e) {
        this.setState({value:e.target.value});
    }

    handleSubmit(e) {
        this.props.saveUser(this.state.value);
    }
    render() {
        return (
            <div className="LoginPage">
                        <div className="row">Must be signed in</div>
                        <form onSubmit={(e)=>this.handleSubmit(e)}>
                            <label>
                            <input placeholder="User ID" value={this.state.value} type="text" onChange={(e)=>this.handleValue(e)} />
                            </label>
                            <input type="submit" value="Sign in" />
                        </form>  
            </div>
        );       
    }
}

export default LoginPage;