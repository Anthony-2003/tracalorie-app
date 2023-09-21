
import CalorieTracker from './classes/CalorieTracker.js';
import Workout from './classes/Workout.js';
import Meal from './classes/Meal.js';

const tracker = new CalorieTracker();
const breakfast = new Meal('Bread', 2099);
const squat = new Workout('squat x12', 100);
tracker.addMeal(breakfast);
tracker.addWorkout(squat);





