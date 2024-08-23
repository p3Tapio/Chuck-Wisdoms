const getRandomChuckNorrisWisdom = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const json = await response.json();
    const chuckWisdom = document.getElementById("chuck-wisdom");
    const speechBubble = document.getElementById("speech-bubble");
    const mainButton = document.getElementById("main-button");
    const mainHeader = document.getElementById("main-header");
    chuckWisdom.innerText = json.value;
    speechBubble.style.display = "inline-block";
    mainButton.style.visibility = "hidden";
    mainHeader.style.visibility = "hidden";
  } catch (e) {
    console.error(e);
    element.innerText = "Chuck is on vacation, try again later!";
  }
};
