const getElements = () => {
  const chuckWisdom = document.getElementById("chuck-wisdom");
  const speechBubble = document.getElementById("speech-bubble");
  const mainButton = document.getElementById("main-button");
  const mainHeader = document.getElementById("main-header");
  const resetButton = document.getElementById("reset-button");
  return { chuckWisdom, speechBubble, mainButton, mainHeader, resetButton };
};

const getRandomChuckNorrisWisdom = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const json = await response.json();
    const { chuckWisdom, speechBubble, mainButton, mainHeader, resetButton } =
      getElements();
    chuckWisdom.innerText = json.value;
    speechBubble.style.display = "inline-block";
    mainButton.style.visibility = "hidden";
    mainHeader.style.visibility = "hidden";
    resetButton.style.visibility = "visible";
  } catch (e) {
    console.error(e);
    element.innerText = "Chuck is on vacation, try again later!";
  }
};

const reset = () => {
  const { speechBubble, mainButton, mainHeader, resetButton } = getElements();
  speechBubble.style.display = "none";
  mainButton.style.visibility = "visible";
  mainHeader.style.visibility = "visible";
  resetButton.style.visibility = "hidden";
};
