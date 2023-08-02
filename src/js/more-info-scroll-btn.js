const rightArrow = document.querySelector('#moreInfo-right-btn');
const leftArrow = document.querySelector('#moreInfo-left-btn');
const moreInfoBlock = document.querySelector('.moreInfo__block');

rightArrow.addEventListener('click', scrollToLeft);
leftArrow.addEventListener('click', scrollToRight);

function scrollToLeft() {
  rightArrow.classList.add('moreInfo_scroll_arrow_hidden');
  leftArrow.classList.remove('moreInfo_scroll_arrow_hidden');
  moreInfoBlock.scroll({
    left: 550,
    behavior: 'smooth',
  });
}

function scrollToRight() {
  rightArrow.classList.remove('moreInfo_scroll_arrow_hidden');
  leftArrow.classList.add('moreInfo_scroll_arrow_hidden');
  moreInfoBlock.scroll({
    left: -550,
    behavior: 'smooth',
  });
}

// This code controls the scrolling behavior of a block element (`moreInfoBlock`) horizontally when clicking on two arrow buttons (`rightArrow` and `leftArrow`). The intention is to reveal or hide content within the `moreInfoBlock` element based on the scrolling action:

// 1. **Element Selection**:
//    - `rightArrow` is a reference to an HTML element with the ID `moreInfo-right-btn`.
//    - `leftArrow` is a reference to an HTML element with the ID `moreInfo-left-btn`.
//    - `moreInfoBlock` is a reference to an HTML element with the class `moreInfo__block`.

// 2. **Event Listeners**:
//    - An event listener is added to the `rightArrow` button. When the button is clicked, the `scrollToLeft` function will be executed.
//    - An event listener is added to the `leftArrow` button. When the button is clicked, the `scrollToRight` function will be executed.

// 3. **scrollToLeft Function**:
//    - When the `scrollToLeft` function is called (usually when the right arrow is clicked):
//      - The `moreInfoBlock` is scrolled horizontally by a distance of 550 pixels to the left.
//      - The `rightArrow` is hidden (using a CSS class `moreInfo_scroll_arrow_hidden`), indicating that scrolling to the left is no longer possible.
//      - The `leftArrow` is shown (removing the `moreInfo_scroll_arrow_hidden` class), indicating that scrolling to the right is possible.

// 4. **scrollToRight Function**:
//    - When the `scrollToRight` function is called (usually when the left arrow is clicked):
//      - The `moreInfoBlock` is scrolled horizontally by a distance of 550 pixels to the right (or -550 pixels to the left, which achieves the same effect).
//      - The `rightArrow` is shown (removing the `moreInfo_scroll_arrow_hidden` class), indicating that scrolling to the left is possible.
//      - The `leftArrow` is hidden (using a CSS class `moreInfo_scroll_arrow_hidden`), indicating that scrolling to the right is no longer possible.

// In summary, this code sets up event listeners for two arrow buttons, and when clicked, it scrolls a block element horizontally to reveal or hide content. The buttons and the scrolling behavior create a UI interaction for navigating through content within the `moreInfoBlock`. The `moreInfo_scroll_arrow_hidden` class is used to control the visibility of the arrow buttons based on the scrolling direction.
