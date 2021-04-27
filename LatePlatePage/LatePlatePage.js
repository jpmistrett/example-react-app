import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import BackX from "../../components/BackX/BackX";
import { ChefNET } from "../../modules/ChefNET/ChefNET";
import Confirmed from './Confirmed.png';
import './LatePlatePage.css';


class LatePlatePage extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {requestComplete: false};
    }

    componentDidMount() {
        const chefnet = ChefNET.getInstance();
        let {action, mealId} = this.props.match.params;

        if (action === "request") {
            chefnet.requestLatePlate(mealId)
                .then(() => {
                    this.setState({requestComplete: true});
                });
        } else if (action === "cancel") {
            chefnet.cancelLatePlate(mealId)
                .then(() => {
                    this.setState({requestComplete: true});
                });
        }
    }

    render() {
        return (
            <div className="RequestLatePlatePage">
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        if (this.state.requestComplete) {
            return (
                <div>
                    <BackX/>
                    <img className="RequestLatePlatePage__Confirmed" alt="Boxed Meal Confirmed" src={Confirmed}/>
                    <div className="RequestLatePlatePage__Content">
                        {this.renderContentText()}
                    </div>
                </div>
            )
        } else {
            return (
                <p>{this.props.match.params.action}ing boxed meal...</p>
            )
        }
    }

    renderContentText() {
        let {action} = this.props.match.params;

        if (action === "request") {
            return (
                <p>
                    Perfect!<br/>
                    Your boxed meal will be ready for you later.
                </p>
            )
        } else if (action === "cancel") {
            return (
                <p>
                    Okay!<br/>
                    We cancelled your boxed meal order.
                </p>
            )
        }
    }
}

export default withRouter(LatePlatePage);
