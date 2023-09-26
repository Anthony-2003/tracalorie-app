import CalorieTracker from './classes/CalorieTracker.js';
import Meal from './classes/Meal.js';
import Workout from './classes/Workout.js';
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._loadEventListeners();
    this._tracker.loadItems();
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(name.value, Number(calories.value));
      this._tracker.addMeal(meal);

    } else {
      const workout = new Workout(name.value, Number(calories.value));
      this._tracker.addWorkout(workout);
    }

    name.valuie = '';
    calories.value = '';
  }

  _removeItem(type, e) {
    if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
      if (confirm('Are u sure?')) {
        const id = e.target.closest('.card').getAttribute('data-id');

        type === 'meal'
         ? this._tracker.removeMeal(id)
         : this._tracker.removeWorkout(id);

          e.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach(item => {
      const name = item.firstElementChild.firstElementChild.textContent;

      if(name.toLowerCase().indexOf(text) !== -1){
       item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _reset (){
    this._tracker.reset();
    document.getElementById('meal-items').innerHTML ='';
    document.getElementById('workout-items').innerHTML ='';
    document.getElementById('filter-meals').value ='';
    document.getElementById('filter-workouts').value ='';
  }

  _setLimit(e){
    e.preventDefault();
    const limit = document.getElementById('limit');
    if(limit.value === ''){
        alert('Please add a limit');
        return;
    }

    this._tracker.setLimit(Number(limit.value));
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

  }

  _loadEventListeners(){
    document
    .getElementById('meal-form')
    .addEventListener('submit', this._newItem.bind(this, 'meal'));

  document
    .getElementById('workout-form')
    .addEventListener('submit', this._newItem.bind(this, 'workout'));

  document
    .getElementById('meal-items')
    .addEventListener('click', this._removeItem.bind(this, 'meal'));

  document
    .getElementById('workout-items')
    .addEventListener('click', this._removeItem.bind(this, 'workout'));

  document
    .getElementById('filter-meals')
    .addEventListener('keyup', this._filterItems.bind(this, 'meal'));

  document
    .getElementById('filter-workouts')
    .addEventListener('keyup', this._filterItems.bind(this, 'workout'));

  document
    .getElementById('reset')
    .addEventListener('click', this._reset.bind(this));

  document
    .getElementById('limit-form')
    .addEventListener('submit', this._setLimit.bind(this));
  }
}

const app = new App();