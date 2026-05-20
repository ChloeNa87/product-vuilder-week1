# Project Overview

This project is a simple web-based lottery number generator. It will generate and display 6 unique random numbers.

# Current Implementation

*   **HTML (`index.html`):** Basic HTML structure.
*   **CSS (`style.css`):** Minimal styling.
*   **JavaScript (`main.js`):** Minimal JavaScript.

# Plan for Lotto Number Generator

1.  **Modify `index.html`:**
    *   Update the title to "Lotto Number Generator".
    *   Create a container `div` with the id `lotto-container`.
    *   Create a button with the id `generate-button` to generate numbers.

2.  **Modify `style.css`:**
    *   Add styles for the main container, the lotto number display, and the button.
    *   Use a modern and clean design.
    *   Make it responsive.

3.  **Modify `main.js`:**
    *   Create a function `generateNumbers` that:
        *   Generates an array of 6 unique random integers between 1 and 45.
        *   Sorts the numbers in ascending order.
    *   Create a function `displayNumbers` that takes the array of numbers and displays them in the `lotto-container`.
    *   Add a click event listener to the `generate-button` that calls `generateNumbers` and then `displayNumbers`.
