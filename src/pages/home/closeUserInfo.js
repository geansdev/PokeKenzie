const buttonClose = document.querySelector('.close__user__info')
const modalInfo = document.querySelector('.modal--user--info')
const userImg = document.querySelector('.user__img')
const liLogout = document.querySelector('.li__logout')

buttonClose.addEventListener('click', () => {
    modalInfo.classList.toggle('hidden')
})
userImg.addEventListener('click', () => {
    modalInfo.classList.toggle('hidden')
})
liLogout.addEventListener('click', () => {
    localStorage.clear()
    window.location.replace('../../../index.html')
})

