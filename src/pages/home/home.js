 const container = document.querySelector('.pokemon__container')

const input = document.querySelector('.inputPokemon')
const buttonSearch = document.querySelector('.buttonSearch')

const spanPokemon = document.querySelector('.span__pokemon')
const liPokemon = document.querySelector('.li__pokemon')
const header = document.querySelector('.header')
const body = document.querySelector('body')
const title = document.querySelector('title')

const apiRequest = async() =>{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0.')
    const data = await response.json()
    return(data)
}
const pokemonArray = []

const requestPokemon = async (pokemon) =>{

    const results = pokemon.url

        const response =  await fetch(results)

         pokemonArray.push( await response.json())

        listPokemon(pokemonArray)
        return pokemonArray
}

const data = await apiRequest()
const results = data.results
results.forEach(async (element)=>{
     await requestPokemon(element)
})

async function listPokemon(data){

    container.innerHTML = ''
    data.forEach(element =>{
            const createdPokemon = createPokemon(element)
            container.append(createdPokemon)
        })
 }
 function createPokemon(data){
    const types = data.types[0].type.name

    const li = document.createElement('li')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const span = document.createElement('span')

    const local = JSON.parse(localStorage.getItem('@PokeEscolhido:'))

    if(local == 4){
        body.classList.add('charmander')
        span.classList.add('charmanderLiSpan')
        li.classList.add('charmanderLi')
        header.classList.add('headerCharmander')
    }else if(local == 1){

        body.classList.add('bulbasaur')
        span.classList.add('bulbasaurLiSpan')
        li.classList.add('bulbasaurLi')
        header.classList.add('headerBulbasaur')
    }else{
        body.classList.add('squirtle')
        span.classList.add('squirtleLiSpan')
        li.classList.add('squirtleLi')
        header.classList.add('headerSquirtle')
    }
    

img.src = data['sprites']["versions"]["generation-v"]["black-white"]["animated"]["front_default"] 
 h2.innerText = data.name
span.innerText = types
     

    li.append(img, h2, span)

    return li
 }

 buttonSearch.addEventListener('click',(event)=>{
        event.preventDefault()
        const inputValue = input.value.toLowerCase()
        if(inputValue === ""){
            listPokemon()
        }

        filteredPokemon(inputValue)
    })
const filteredPokemon = async(poke) =>{

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    const data = await pokemon.json()
    if(data){
        listFilteredPokemon(data)
    }

}

const listFilteredPokemon = (pokemon) =>{
    container.innerHTML = ''
   const createdPokemon = createFilteredPokemon(pokemon)

    container.append(createdPokemon)
}
function createFilteredPokemon(pokemon) {

    const types = pokemon.types[0].type.name

    const li = document.createElement('li')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const span = document.createElement('span')
    li.classList.add('li__pokemon')
    span.classList.add('span__pokemon')

    h2.innerText = pokemon.name
    img.src = pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    span.innerText = types
    li.append(img, h2, span)


    const local = JSON.parse(localStorage.getItem('@PokeEscolhido:'))

    if(local == 4){
        body.classList.add('charmander')
        span.classList.add('charmanderLiSpan')
        li.classList.add('charmanderLi')
        header.classList.add('headerCharmander')
    }else if(local == 1){

        body.classList.add('bulbasaur')
        span.classList.add('bulbasaurLiSpan')
        li.classList.add('bulbasaurLi')
        header.classList.add('headerBulbasaur')
    }else{
        body.classList.add('squirtle')
        span.classList.add('squirtleLiSpan')
        li.classList.add('squirtleLi')
        header.classList.add('headerSquirtle')
    }

    return li
} 

function setUserInfo(){
    const getLocalUserInfo = JSON.parse(localStorage.getItem('PokeKenzie'))
    title.innerText = `PokeHome | ${getLocalUserInfo.user.name}` 
    const userImg = document.querySelector('.user__img')
    const userName = document.querySelector('.user__name')
    const userModalName = document.querySelector('.user__modal__name')
    const userModalImg = document.querySelector('.user__modal__img')

    userImg.src = getLocalUserInfo.user.avatar_url
    userModalImg.src = getLocalUserInfo.user.avatar_url
    userName.innerText = getLocalUserInfo.user.name
    userModalName.innerText = getLocalUserInfo.user.name
}
setUserInfo()
function getLocalId(){
    const local = JSON.parse(localStorage.getItem('@PokeEscolhido:'))

    getOnlyPokemon(local)
}
async function getOnlyPokemon(id){
    const pokeGif = document.querySelector('.pokemon__gif')

    pokeGif.src = '../../assets/spinner.svg'
    pokeGif.classList.add('animationRotate')

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    
    pokeGif.classList.remove('animationRotate')
    pokeGif.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
}
getLocalId()

const headerImg = document.querySelector('.header__img')
headerImg.addEventListener('click', () =>{
    window.location.replace('./home.html')
})