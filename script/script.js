console.log("swiper.js is loaded!");
document.addEventListener('DOMContentLoaded', function() {
    const subMenuContent = document.querySelector('.sub_menu_content');
    const items = subMenuContent.querySelectorAll('a');
    const itemsPerRow = 5;

    for (let i = 0; i < items.length; i++) {
        if (i % itemsPerRow === 0) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            subMenuContent.appendChild(rowDiv);
        }
        subMenuContent.lastChild.appendChild(items[i]);
    }
});

