function toggleMenu() {
    const menuMiddle = document.querySelector('.menu_middle');
    const toggleButton = document.querySelector('.menu-toggle i');
    menuMiddle.classList.toggle('active');

    // Thay đổi biểu tượng của nút toggle
    if (menuMiddle.classList.contains('active')) {
        toggleButton.classList.remove('fa-bars');
        toggleButton.classList.add('fa-times'); // Biểu tượng "X"
    } else {
        toggleButton.classList.remove('fa-times');
        toggleButton.classList.add('fa-bars'); // Biểu tượng menu
    }
}

// Toggle submenu khi nhấn vào mục có submenu
function toggleSubMenu(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    const subMenu = event.target.closest('.sub_menu');
    subMenu.classList.toggle('active');
}