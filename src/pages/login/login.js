const redirectCadastro = () => {

    const btnHeaders = document.querySelector("header nav button");
    const btnContainerLogin = document.querySelector("#irCadastro");

    btnHeaders.addEventListener("click", () => {
        window.location.replace("./src/pages/cadastro/cadastro.html")
    });
    btnContainerLogin.addEventListener("click", () => {
        window.location.replace("./src/pages/cadastro/cadastro.html")
    });

}

const toastFyLoginErro = () => {

    const body  = document.querySelector("body")
    const div = document.createElement("div")
    div.classList.add("divToast")
    const h2 = document.createElement("h2")
    
    h2.innerText = "Email ou senha inválidos."
    div.appendChild(h2)
    body.appendChild(div)

}

const requestLogin = async(body) => {

    const btnForm = document.querySelector("form button")

    try {
        
        const login = await fetch("https://m2-api-adot-pet.herokuapp.com/session/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        if(login.ok){

            const response = await login.json()

            btnForm.innerHTML = ""
            btnForm.innerText = "Logar"
            
            window.location.replace("./src/pages/escolherPokemon/escolherPokemon.html")

            localStorage.setItem("PokeKenzie", JSON.stringify(response))

        }else{

            btnForm.innerHTML = ""
            btnForm.innerText = "Logar"
            toastFyLoginErro()

        }
        

    } catch (error) {

        console.log(error)
        toastFyLoginErro()
    
    }
}

const login = () => {

    const form = document.querySelector("form");
    const btnForm = document.querySelector("form button")
    const elements = [...form];
    const body = {};

    form.addEventListener("submit", async e => {

        e.preventDefault()
        elements.forEach(element => {
            if(element.tagName == "INPUT" && element.value != ""){
                body[element.id] = element.value
            }
        });

        const btn = elements[2]
        const img = document.createElement("img")
        // img.classList.add("animationRotate")
        img.src = "./src/assets/spinner.svg"
        btn.innerHTML = ""
        btn.appendChild(img)

        await requestLogin(body)

    });

}

const animationLabelInput = () => {
    const labelEmail = document.querySelector("#labelemail")
    const inputEmail = document.querySelector("#email")
    const labelPass = document.querySelector("#labelpassword")
    const inputPassword= document.querySelector("#password")

    labelEmail.addEventListener("click", e => {
        e.preventDefault()
        inputEmail.classList.toggle("growInput")
        if(inputEmail.classList.contains("growInput")){
            inputEmail.disabled = false
        }else{
            inputEmail.disabled = true
            inputEmail.value = ""
        }
    })

    labelPass.addEventListener("click", e => {
        e.preventDefault()
        inputPassword.classList.toggle("growInput")
        if(inputPassword.classList.contains("growInput")){
            inputPassword.disabled = false
        }else{
            inputPassword.disabled = true
            inputPassword.value = ""
        }
    })


}

redirectCadastro()
login()
animationLabelInput()
