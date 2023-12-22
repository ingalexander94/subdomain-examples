import { BlocksControl } from "../../lib/blocks.js";
import { createGame, movePlayer, resetPlayer } from "./js/kaboom.js";
import { setTrashIcon, startTimer } from "../../lib/timer.js";

const $d = document;

const btnRepeat = $d.querySelector("button.btn-repeat");
const btnContinue = $d.querySelector("button.btn-continue");
const btnRefresh = $d.querySelector("section.controls > button");
const modalSuccess = $d.getElementById("modal_success");
const modalInstructions = $d.getElementById("modal_instructions");
const btnshowInstructions = $d.getElementById("show_instructions");

const toggleAudio = $d.querySelector("input#toggle_audio");

const audio = new Audio(
  "https://umake.com.co/components/retos/assets/audio/sound.mp3"
);

const blockControl = new BlocksControl("blocklyDiv", 3);

$d.addEventListener("DOMContentLoaded", () => {
  const browser = getBrowserName();
  const videoinstructions = modalInstructions.querySelector("video");
  if (browser === "Chrome") {
    videoinstructions.removeAttribute("muted");
    videoinstructions.muted = false;
    var eventClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    btnshowInstructions.dispatchEvent(eventClick);
  }
  videoinstructions.muted = false;
  audio.loop = true;
  audio.volume = 0.05;
  toggleAudio.setAttribute("checked", false);
  createGame();
  startTimer();
  blockControl.createMainBlock();
  setTrashIcon(3);
});

toggleAudio.addEventListener("change", ({ target }) => {
  if (!target.checked) audio.play();
  else audio.pause();
});

const btnPlay = $d.getElementById("play");
const btnReplay = $d.getElementById("replay");

btnPlay.addEventListener("click", () => {
  let movements = blockControl.play();
  if (movements.length) {
    btnPlay.style.display = "none";
    btnReplay.style.display = "block";
    btnReplay.setAttribute("disabled", true);
    movePlayer(movements);
  }
});

btnReplay.addEventListener("click", () => {
  btnPlay.style.display = "block";
  btnReplay.style.display = "none";
  resetPlayer();
});

btnRepeat.addEventListener("click", () => {
  location.reload();
});

btnRefresh.addEventListener("click", () => {
  location.reload();
});

btnContinue.addEventListener("click", () => {
  const btnComplete = $d.querySelector("button.button-complete-lesson");
  if (btnComplete) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    btnComplete.dispatchEvent(event);
    const btnConfirm = $d.querySelector("button.lp-button.btn-yes");
    btnConfirm.dispatchEvent(event);
  } else {
    UIkit.modal(modalSuccess).hide();
    window.location.replace(
      "https://umake.com.co/courses/la-robotica/lessons/reto-3/"
    );
    window.history.replaceState({}, document.title, window.location.href);
  }
});
