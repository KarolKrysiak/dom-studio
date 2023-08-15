const bar = document.querySelector('.bar');
const text = document.querySelector('.text');
const plusIcon = document.querySelector('.plus');

bar.addEventListener('click', () => {
    text.classList.toggle('text-visible');
    plusIcon.classList.toggle('rotate-plus');
});