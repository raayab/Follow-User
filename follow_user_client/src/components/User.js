import React,{Component} from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state ={
            followStatus:this.props.followStatus
        };
        this.changeFollowStatus = this.changeFollowStatus.bind(this);
        
    }
    onMouseOver(e) {
        this.setState({followStatus:'Unfollow'});
    }
    onMouseOut(e) {
        this.setState({followStatus:this.props.followStatus});
    }
    changeFollowStatus = (e) => {
        this.props.handleFollowStatus(this.props.id,this.props.followStatus);
        this.setState({followStatus: this.state.followStatus==="Follow" ? 'Unfollow' : 'Follow'}) ;

    }
    render() {
        
        return (
            <tr className="table_row">
                <td className="item">{this.props.name}</td>
                <td className="item">{this.props.groupName}</td>
                <td className="item">{this.props.numOfFollowers? this.props.numOfFollowers : 0}</td>
                <td className="item"> 
                    <button className={this.state.followStatus} onClick={this.changeFollowStatus}
                            onMouseEnter={this.state.followStatus==='Following'?this.onMouseOver.bind(this):()=>{}}
                            onMouseLeave={this.state.followStatus==='Unfollow'?this.onMouseOut.bind(this):()=>{}}>
                    <span>
                       {this.state.followStatus}
                    </span>
                    </button>
                    </td>
            </tr>
        );
    }
}

export default User;