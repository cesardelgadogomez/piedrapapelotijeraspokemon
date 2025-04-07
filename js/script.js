const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

const botImages = ["./img/Bulbasaur.png", "./img/Charmander.png", "./img/Squirtle.png"];
const outcomes = {
  RR: "Draw",
  RP: "¡El bot",
  RS: "¡Tú",
  PP: "Draw",
  PR: "¡Tú",
  PS: "¡El bot",
  SS: "Draw",
  SR: "¡El bot",
  SP: "¡Tú"
};

function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);

  userResult.src = botResult.src = "./img/Poké_Ball_icon.png";
  result.textContent = "Espera...";

  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;

    const randomNumber = Math.floor(Math.random() * botImages.length);
    const botImageSrc = botImages[randomNumber];
    botResult.src = botImageSrc;

    const userValue = ["R", "P", "S"][clickedIndex];
    const botValue = ["R", "P", "S"][randomNumber];
    const outcomeKey = userValue + botValue;
    const outcome = outcomes[outcomeKey] || "Unknown";

    if (userValue === botValue) {
      result.textContent = "Empate";
    } else if (outcome === "¡Tú") {
      result.textContent = "¡Tú ganas!";
    } else if (outcome === "¡El bot") {
      result.textContent = "¡El bot gana!";
    } else {
      result.textContent = "Resultado desconocido";
    }
  }, 1500);
}

optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});