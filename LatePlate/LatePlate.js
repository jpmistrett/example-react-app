import React from 'react';
import MealIcon from '../MealIcon/MealIcon';
import './LatePlate.css';

const DATE_FORMAT = 'dddd, MMMM Do';

export default class LatePlate extends React.Component {
    formatDate = (meal) => meal.getMoment().format(DATE_FORMAT);

    render() {
        const meal = this.props.meal;
        return (
            <div className="LatePlate">
                <MealIcon className="LatePlate__Plate" type={meal.getName()}/>

                <div className="LatePlate__MealDetails">
                    <div className="LatePlate__Date">{this.formatDate(meal)}</div>
                    <div className="LatePlate__Name">{meal.getName()}</div>
                    <div className="LatePlate__Entree">{meal.getEntree()}</div>
                    {/*<div>Star rating</div>*/}
                    {/*<div>Left comment</div>*/}
                </div>
            </div>
        )
    }
}
