class CalorieTracker {
    constructor(){
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

    addMeal(meal){
     this._meals.push(meal);
     this._totalCalories += meal.calories;
     this._render();
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render();
    }

    _displayCaloriesTotal(){
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.textContent = this._totalCalories;
    }

    _displayCaloriesLimit(){
        const caloriesLimitEl = document.getElementById('calories-limit');
        caloriesLimitEl.textContent = this._calorieLimit;
    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total+meal.calories, 0);
        caloriesConsumedEl.textContent = consumed;
    }

    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workout) => total+workout.calories, 0);
        caloriesBurnedEl.textContent = burned;
    }

    _displayCaloriesRemaining(){
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const progressEl = document.getElementById('calorie-progress');
        const remaining = this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.textContent = remaining;

        if(remaining <= 0){
           caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
           caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
           progressEl.classList.remove('bg-succes');
           progressEl.classList.add('bg-danger');
        } else {
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-succes');
        }
    }

    _displayCaloriesProgress(){
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories/this._calorieLimit)*100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;
    }

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

export default CalorieTracker;
