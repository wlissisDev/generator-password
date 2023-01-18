const contentInput = document.querySelector(".length");
const input = contentInput.querySelector("input");
const barprogress = contentInput.querySelector("div");

const numberCharacter = document.querySelector(".number");
const buttonGenerate = document.querySelector(".button");

const checkBoxInput = document.querySelectorAll(".option input");
const bars = document.querySelectorAll(".bar");

const forceName = document.getElementById("forceName");

const result = document.getElementById("result");

const clip = document.querySelector('.clip')

input.addEventListener("input", (e) => {
  let valueInput = e.target.value;
  barprogress.style.width = `${valueInput * 5}%`;
  numberCharacter.innerHTML = valueInput;
});

let numeroDeChecked = 0;
let bool = true;

checkBoxInput.forEach((inputItem) => {
  inputItem.addEventListener("click", (e) => {
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      if (numeroDeChecked <= 4) {
        bars[numeroDeChecked].style.backgroundColor = "gold";
        numeroDeChecked++;

        switch (numeroDeChecked) {
          case 1:
            forceName.innerHTML = "fraca";
            break;
          case 2:
            forceName.innerHTML = "média";
            break;
          case 3:
            forceName.innerHTML = "boa";
            break;
          case 4:
            forceName.innerHTML = "ótima";
            break;
          default:
            break;
        }
      }
    } else {
      if (numeroDeChecked >= 0) {
        numeroDeChecked--;
        bars[numeroDeChecked].style.backgroundColor = "transparent";

        switch (numeroDeChecked) {
          case 1:
            forceName.innerHTML = "fraca";
            break;
          case 2:
            forceName.innerHTML = "média";
            break;
          case 3:
            forceName.innerHTML = "boa";
            break;
          case 4:
            forceName.innerHTML = "ótima";
            break;
          default:
            break;
        }
      }
    }
  });
});

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()[]{}=<>,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFun = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function generate(length) {
  for (let i = 0; i < length; i++) {
    let password = "";
    let uper = getRandomUpper();
    let low = getRandomLower();
    let num = getRandomNumber();
    let symbol = getRandomSymbol();

    password.concat(uper, low, num, symbol);
    return password;
  }
}

buttonGenerate.addEventListener("click", () => {
  const length = +input.value;
  const hasUpper = checkBoxInput[0].checked;
  const hasLower = checkBoxInput[1].checked;
  const hasNumber = checkBoxInput[2].checked;
  const hasSymbol = checkBoxInput[3].checked;

  result.innerText = generatePassword(
    hasLower,
    hasNumber,
    hasSymbol,
    hasUpper,
    length
  );
});

clip.addEventListener("click",()=>{
  const textarea = document.createElement('textarea')
  const password = result.innerHTML;
  if(!password){
    return;
  }

  textarea.value = password
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy')
  textarea.remove()
  alert("Senha copiada")

})

function generatePassword(lower, number, symbol, upper, length) {
  let generatePassword = "";

  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type =>{
      const funcName = Object.keys(type)[0]
      //executando a funcao do objeto randomFun que poassue checked
      generatePassword += randomFun[funcName]();
    })
  }


  //recorta a senha para mostrar do tamanho exato do langth
  const finalPassword =  generatePassword.slice(0,length)
  return finalPassword;
}
