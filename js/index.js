document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.js-toggle-btn').addEventListener('click', e => {
        document.getElementsByClassName('nav__items')[0].classList.add('active');
    });
    
    document.querySelector('.js-nav-mask').addEventListener('click', e => {
        document.getElementsByClassName('nav__items')[0].classList.remove('active');
    });
})
