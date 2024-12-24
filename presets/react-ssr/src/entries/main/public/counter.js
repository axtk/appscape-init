"use strict";
{
function init() {
    let container = document.querySelector('.counter');

    if (!container)
        return;

    let [minus, plus] = container.querySelectorAll('button');
    let display = container.querySelector('strong');

    minus.addEventListener('click', () => {
        display.textContent = Number(display.textContent) - 1;
    });

    plus.addEventListener('click', () => {
        display.textContent = Number(display.textContent) + 1;
    });
}

init();
}
