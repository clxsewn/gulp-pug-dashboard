const burgerMenu = document.getElementById('burger-menu')
const aside = document.querySelector('aside.aside')

burgerMenu.addEventListener('click', () => {
    aside.classList.toggle('show')
})