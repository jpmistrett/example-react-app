import React from 'react';
import { Link, withRouter } from "react-router-dom";

import BaseComponent from "../../components/BaseComponent/BaseComponent";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import Config from "../../config";

import { ChefNET } from '../../modules/ChefNET/ChefNET';
import Chevron from "./Chevron.svg";
import IconPadlock from "./IconPadlock.svg";
import './LoginPage.css'

class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        const chefnet = ChefNET.getInstance();
        this.userSubscription = chefnet.getCurrentUserObservable().subscribe({
            next: this.onCurrentUserChanged,
            error: this.onApiError,
        });
    }

    componentWillUnmount() {
        this.userSubscription.unsubscribe();
        this.userSubscription = null;
    }

    handleInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onCurrentUserChanged = (newCurrentUser) => {
        if (!newCurrentUser.isAnonymous() && newCurrentUser !== this.state.user) {
            this.setState({user: newCurrentUser});
            this.props.history.push("/meals");
        }
    };

    onApiError = (error) => {
        // INVALID_CREDENTIALS
        // NOT_STUDENT
        console.log('NOPE', error);
    };

    handleLoginButton = (event) => {
        event.preventDefault();
        const chefnet = ChefNET.getInstance();
        chefnet.login(this.state.email, this.state.password);
    };

    keyPressed = event => {
        if(event.key === "Enter") {
            this.handleLoginButton(event);
        }
    };

    render() {
        return (
            <div className="LoginPage">
                <Logo includeText={true}/>
                <form className="LoginUI" onSubmit={this.handleLoginButton}>
                    <div>
                        <h1>Welcome back!</h1>
                        <p>We can't wait for you to see what's on the menu tonight!</p>
                    </div>

                    <div className="loginInputs">
                        <input name="email" type="email" value={this.state.email} onChange={this.handleInputChanged} onKeyPress={this.keyPressed} placeholder="Your Email Address" />
                        <input name="password" value={this.state.password} onChange={this.handleInputChanged} onKeyPress={this.keyPressed} type="password" placeholder="Password"/>
                        <a href={`${Config.chefNetBaseUrl}/Password-Reset`}><img className="IconPadlock" src={IconPadlock} alt=""/> Forgot Password?</a>
                    </div>

                    <div className="loginNavigation">
                        <Button type="submit" onClick={this.handleLoginButton}>Login</Button>
                        <p>Don't have an account yet? <Link to="/register">Sign up</Link><img className="Chevron" src={Chevron} alt=""/></p>
                    </div>
                </form>
            </div>
        )
    }

}

export default withRouter(LoginPage);
