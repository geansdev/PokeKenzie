const randomPokemon = document.querySelector('.random__pokemon')
const randomName = document.querySelector('.show__pokemon')
const randomImg = document.querySelector('.random__pokemon__img')
const container = document.querySelector('.pokemon__info__container')
const audio = document.querySelector('audio')
const unactive = document.querySelector('.unactive__music')



const buttonCaputre = document.querySelector('.button__capture')

const catchedPokemonsLocal = JSON.parse(localStorage.getItem('pokemon'))
if(catchedPokemonsLocal){
    catchedPokemonsLocal.forEach(Poke =>{
        createPokemon(Poke)
    })
}
const response = async(id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()

    randomPokemon.classList.toggle('hidden')
    audio.src = '../../assets/Música de Pokemon Red & Blue - Batalla (VS. Pokemon Salvaje) (320 kbps) (mp3cut.net).mp3'

    randomName.innerText = ` Um ${data.name} selvagem apareceu!!`
    randomImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]

    buttonCaputre.removeAttribute('disabled', '')
    buttonCaputre.setAttribute('id', data.id)

}


setInterval(()=>{
    const teste = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const number = Math.floor(Math.random() * (max- min) + min)
        response(number)
        
    }
    teste(1, 500)
},60000)

let pokemons = []
    const captured = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const number = Math.floor(Math.random() * (max- min + 1) + min)
    if(number == 1){
        randomImg.src = '../../assets/Logo-Pokebola-Pokémon-PNG.png'
        randomName.innerText = 'Parabéns, pokemon capturado com sucesso!'
        getPokemon(buttonCaputre.id)


    }else{
        randomImg.src = '../../assets/9adb95e279561199420b54b063492669.jpg'
        randomName.innerText = 'O pokemon fugiu!'
    }
}

buttonCaputre.addEventListener('click', ()=>{
    randomImg.src = '../../assets/pokeball_PNG22.png'
    setTimeout(()=>{
        randomImg.classList.add('pokeball')
    },800)
    randomName.innerText = 'tentando capturar o pokemon'

    setTimeout(()=>{
        randomImg.classList.remove('pokeball')
        captured(1, 2)
        audio.src = '../../assets/PokemonMusic.mp3'
        
    },5000)
    buttonCaputre.setAttribute('disabled', '')
    
})


async function getPokemon(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    createPokemon(data)
    pushPokemon(data)
    return data
}
function pushPokemon(pokemon){
    let pokemons = JSON.parse(localStorage.getItem('pokemon')) || []
    pokemons.push(pokemon)
    localStorage.setItem('pokemon', JSON.stringify(pokemons))
}

function createPokemon(pokemon){

    const li = document.createElement('li')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')

    img.src = pokemon['sprites']["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    h2.innerText = pokemon.name

    li.append(img, h2)
    container.append(li)
}
unactive.addEventListener('click', ()=>{
    if(unactive.innerText =='ativar som'){
        audio.play()
        unactive.innerText = 'desativar som'
    }
    else{
        audio.pause()
        unactive.innerText = 'ativar som' 
    }
})



 
