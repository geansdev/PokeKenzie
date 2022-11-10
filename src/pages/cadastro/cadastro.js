function toast() {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.classList.add("divToast");
  const h2 = document.createElement("h2");
  h2.innerText = "verifique o campo de image";
  div.appendChild(h2);
  body.appendChild(div);
}

export const requestCadastro = async (body) => {
  try {
    const login = await fetch("https://m2-api-adot-pet.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (login.ok) {
      const response = await login.json();
      window.location.replace("../../../index.html");
    }
    toast();
  } catch (error) {
    console.log(error);
  }
};

async function capturarDados() {
  const btn = document.querySelector(".btnCadastrar");
  const input = document.getElementById("name");
  btn.disabled = true;
  if (btn.disabled) {
    btn.style.cursor = "not-allowed";
  }
  input.addEventListener("keyup", (event) => {
    if (event.target.value.length !== 0) {
      btn.disabled = false;
      btn.style.cursor = "pointer";
    } else {
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
    }
  });

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    btn.innerHTML = "";
    const img = document.createElement("img");
    img.classList.add("ImgpokeBtn");
    img.src = "../../assets/pokemon-pokeball-pointerPKFechada-32x32.png";
    btn.appendChild(img);

    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputPassw = document.getElementById("senha");
    const inputAvatar = document.getElementById("avatar_url");

    const data = {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassw.value,
      avatar_url: inputAvatar.value,
    };
    await requestCadastro(data);
  });
}
capturarDados();

const btn = document.querySelector(".voltarLogin");
btn.addEventListener("click", (e) => {
  window.location.replace("../../../index.html");
});
