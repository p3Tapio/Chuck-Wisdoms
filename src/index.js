document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("reset-button").addEventListener("click", reset);
  document
    .getElementById("main-button")
    .addEventListener("click", getRandomChuckNorrisWisdom);
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
});

const getElements = () => {
  return [
    "chuck-wisdom",
    "speech-bubble",
    "main-button",
    "main-header",
    "reset-button",
    "chuck-face",
  ].reduce((acc, id) => {
    const [a, b] = id.split("-");
    const key = `${a}${b.charAt(0).toUpperCase() + b.slice(1)}`;
    return { ...acc, [key]: document.getElementById(id) };
  }, {});
};

const getRandomChuckNorrisWisdom = async () => {
  const {
    chuckWisdom,
    speechBubble,
    mainButton,
    mainHeader,
    resetButton,
    chuckFace,
  } = getElements();
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok) throw new Error("Chuck is on vacation, try again later!");
    const json = await response.json();

    chuckWisdom.innerText = json.value;
    chuckFace.style.animation = "none";
    speechBubble.style.display = "inline-block";
    mainButton.style.visibility = "hidden";
    mainHeader.style.visibility = "hidden";
    resetButton.style.visibility = "visible";
  } catch (e) {
    console.error(e);
    chuckWisdom.innerText = e;
    speechBubble.style.display = "inline-block";
  }
};

const reset = () => {
  const { speechBubble, mainButton, mainHeader, resetButton, chuckFace } =
    getElements();
  chuckFace.offSetHeight;
  chuckFace.style.animation = null;
  speechBubble.style.display = "none";
  mainButton.style.visibility = "visible";
  mainHeader.style.visibility = "visible";
  resetButton.style.visibility = "hidden";
};
