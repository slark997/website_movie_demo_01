document.addEventListener('DOMContentLoaded', function () {
     var swiper = new Swiper('.popular-content', {
        slideperView: 1,
        loop: true,
        spaceBetween: 10,
        autoplay: {
            delay: 755500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            280: {
                slidesPerView: 1,
                spaceBetween: 5,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            510: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            758: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            900: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        }
    });
});