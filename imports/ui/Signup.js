import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // only 'set' state like this in the constructor
            error: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 9) {
            return this.setState({error: 'Password must be longer than 8 characters long'});
        }
        this.props.createUser({email, password}, (err) => {
            if(err){
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" name="email" placeholder="Email" ref="email"/>
                        <input type="password" name="password" placeholder="Password" ref="password"/>
                        <button className="button">Create Account</button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    creatUser: React.PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        createUser: Accounts.createUser
    };
}, Signup);