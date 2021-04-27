import React from 'react';
import MealIcon from "../MealIcon/MealIcon";
import './Meal.css';

export default class Meal extends React.Component {

    IsSelected = (meal) => {
        if (meal.getLatePlateStatus() === "pending") {
            return "Selected"
        }
        return ""
    };

    IsActive = (meal) => {
        if (meal.isAlreadyServed()) {
            return `Meal--Past`;
        } else {
            return `Meal--Active`;
        }
    };

    renderMealTime(meal) {
        let day = this.getAbsoluteDay(meal.getMoment());
        return `${meal.getName()} ${day}`;
    }

    getAbsoluteDay = (moment) => {
        return moment.format('dddd M/D');
    };

    renderCutoff(meal) {
        if (meal.canRequestLatePlate()){
            if (meal.isLunch()) {
                return "Boxed meal cutoff is 11AM";
            } else if (meal.isDinner()) {
                return "Boxed meal cutoff is 4PM";
            }
        }
    }

    render() {
        const meal = this.props.meal;

        return (
            <div className={`Meal ${this.IsSelected(meal)} ${this.IsActive(meal)}`}>
                <MealIcon type={meal.getName()} mealID={meal.getDnnMealId()}/>

                <div className="Meal__CutoffTime">{this.renderCutoff(meal)}</div>

                <div className="Meal__Title">{this.renderMealTime(meal)}</div>

                <div className="Meal__Entree">{meal.getEntree()}</div>
            </div>
        )
    }

}
