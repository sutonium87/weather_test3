const daysList = document.querySelector('.days-list');
const daysListItem = document.querySelectorAll('.days-list__item');

daysList.addEventListener('click', handleBtnClick);

const activeCardFiveDay = event => {
  const daysListItem = document.querySelectorAll('.days-list__item');
  daysListItem.forEach(e => {
    const day = e.childNodes[1];
    const moreInfoBtn = e.childNodes[9];
    day.classList.remove('days-list__day-of-the-week--active');
    moreInfoBtn.classList.remove('days-list__more-btn__active');
  });

  const target = event.target;
  const listItem = target.closest('.days-list__item');

  if (listItem) {
    const day = listItem.querySelector('.days-list__day-of-the-week');
    const moreInfoBtn = listItem.querySelector('.days-list__more-btn');

    day.classList.add('days-list__day-of-the-week--active');
    moreInfoBtn.classList.add('days-list__more-btn__active');
  }
};

function handleBtnClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName == 'BUTTON') {
    activeCardFiveDay(event);
  }
}

// This module handles the user interaction with a list of days' weather forecast cards on a web page. It enables the user to click on a button (more info button) for a specific day's weather card and marks that card as active while removing the active state from other cards:

// 1. `const daysList = document.querySelector('.days-list');` and `const daysListItem = document.querySelectorAll('.days-list__item');`:
//    - These two lines select the parent element with class `days-list` and store it in the variable `daysList`.
//    - They also select all the child elements with class `days-list__item` (representing individual day cards) and store them in the variable `daysListItem`.

// 2. `daysList.addEventListener('click', handleBtnClick);`:
//    - This line attaches a click event listener to the `daysList` element.
//    - When a click event occurs on any element within the `daysList`, the `handleBtnClick` function will be called.

// 3. `activeCardFiveDay(event)`:
//    - This is a function that marks a specific day's weather card as active.
//    - It first removes the active class from all the day cards (`daysListItem`) to reset their state.
//    - Then, it identifies the clicked element (`target`) and the corresponding day's element in the card (`day`).
//    - It adds the active class to the `day` element and the "more info" button (`target`).

// 4. `function handleBtnClick(event) { ... }`:
//    - This function is called when a click event occurs on any element within the `daysList`.
//    - It prevents the default behavior of the event (in this case, preventing form submission, as indicated by `event.preventDefault()`).
//    - It checks if the clicked element is a button (`target.nodeName == 'BUTTON'`).
//    - If the clicked element is a button, it calls the `activeCardFiveDay` function and passes the event object to it.

// In summary, this code allows the user to click on the "more info" button associated with a specific day's weather card. When the button is clicked, the corresponding card becomes active, visually indicating to the user that it is selected. The active state is removed from other cards in the list, ensuring that only one card can be active at a time. This functionality enhances the user experience by providing visual feedback and making it easy for the user to identify the selected day's weather forecast.
