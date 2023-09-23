import CalorieTracker from './classes/CalorieTracker.js';
import Meal from './classes/Meal.js';
class App {
    constructor(){
       this._tracker = new CalorieTracker();
       
       document
       .getElementById('meal-form')
       .addEventListener('submit', this._newMeal.bind(this));
    }

    _newMeal(e){
        e.preventDefault();

        const name = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        if(name.value==='' || calories.value ===''){
          alert('Please fill in all fields');
          return;
        }

        const meal = new Meal(name.value, Number(calories.value));
        this._tracker.addMeal(meal);

        name.valuie = '';
        calories.value = '';
    }
}

const app = new App();





