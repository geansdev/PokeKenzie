const buttonClose = document.querySelector('.close')
const sectionRandom = document.querySelector('.random__pokemon')
const audio = document.querySelector('audio')

buttonClose.addEventListener('click',() => {
    sectionRandom.classList.toggle('hidden')
    audio.src = '../../assets/PokemonMusic.mp3'
})