const formSelecionarPokemon = document.querySelector("#form___BtnPokemons")
const selecionar = document.querySelector(".mensagem__Prof")
const p = document.querySelector("p")
const modal = document.querySelector("#modal__Pk")
const sim = document.querySelector(".sim")
const nao = document.querySelector(".nao")
const divRes = document.querySelector(".div__Resposta")
let  namePokeEscolhido = ""

const elem = [...formSelecionarPokemon]
elem.forEach(element => {
  element.addEventListener("click", (event)=>{
    event.preventDefault()
    
    modal.classList.toggle("modal")
    formSelecionarPokemon.style.display = "none"
    
    const idPokemonEscolhido = event.target.id
    namePokeEscolhido = event.target.name
    p.innerText = ""
    p.innerText = `Deseja escolher ${namePokeEscolhido} como seu Pokemon?`

        divRes.classList.toggle(namePokeEscolhido)
      
        sim.addEventListener("click", ()=>{
          localStorage.setItem("@PokeEscolhido:", idPokemonEscolhido)
         
            setTimeout(()=>{
              window.location.replace("../home/home.html") 
            }, 2000)
        })
        
      })
    });
    
    nao.addEventListener("click", ()=>{
      modal.classList.toggle("modal")
      if(divRes.classList.contains("charmander") || divRes.classList.contains("bulbasaur") || divRes.classList.contains("squirtle"))
      divRes.classList.remove(namePokeEscolhido)
    })


  const textArr = [
    "Oie, é um prazer conhece-lo!!!",
    "Bem-Vindo ao Fabuloso mundo PokeKenzie!",
    "Meu nome é Professor Carvalho",
    "No mundo que esta prestes a entrar, voce sera o heroi de uma grande aventura.",
    "Este mundo é habitado por várias criaturas chamadas de Pokemon",
    "Escolha seu parceiro de aventura e comece sua jornada!",
  ]

  const divMenssagem = document.querySelector(".div__SpanTextBox")

  const exibirTextos = () => {
    let count = 0
    setInterval(() => {
      divMenssagem.innerHTML = ""

      const spanText = document.createElement("span")

      spanText.style.cssText = "--n:" + textArr[count].length
      spanText.classList.add("mensagem__Prof")

      spanText.innerText = textArr[count]    
      divMenssagem.append(spanText)  
      if (count !== 5) {
        count++
      }else{
        spanText.classList.toggle("mensagem__Prof")
        divMenssagem.id = "btnLocal"
        formSelecionarPokemon.style.display = "flex"
        clearInterval()
      }
    }, 7000)
  }
  setTimeout(()=>{
    exibirTextos()
  },0.1)

  const BtnAudio = document.querySelector("#btn__AudioTroca")
  const tagAudio = document.querySelector("audio")

  BtnAudio.addEventListener("click", ()=>{
    if(BtnAudio.classList == "pararMusica"){
      BtnAudio.classList.remove("pararMusica")
      BtnAudio.classList.add("tocarMusica")
      tagAudio.play()
    }
    else{
      BtnAudio.classList.remove("tocarMusica")
      BtnAudio.classList.add("pararMusica")
      tagAudio.pause()
    }
    BtnAudio.classList.toggle("VoltandoMute")
  })
