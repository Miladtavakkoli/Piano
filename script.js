var currentProfile;
switchProfile(1);


const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

function switchProfile(profile) {
  // switch sound profile
  var name = "mm" + profile;
  
  var elm = document.querySelector(`profile[id="${name}"]`);

  if (!elm) return;//profile not defined

  currentProfile = profile;
  k.innerHTML = "Profile " + profile;
  titleBar.innerHTML = elm.title;
  return;
}

function playNote(e) {
  if (e.repeat) return;

  if (e.keyCode >= 48 && e.keyCode <= 57) {
    // switch the profile
    // for numbers on top of keyboard
    switchProfile(e.keyCode - 48);
    return;
  }

  if (e.keyCode >= 96 && e.keyCode <= 105) {
    // switch the profile
    // for numbers on right of keyboard
    switchProfile(e.keyCode - 96);
    return;
  }

  var name = "mm" + currentProfile;

  var elm = document.querySelector(`profile[id="${name}"]`);

  var audio = elm.querySelector(`audio[data-key="${e.keyCode}"]`);
  var key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

