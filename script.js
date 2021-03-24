
function init()
{
  

const keys = document.querySelectorAll(".key"), /*(Get all of the keys as element with class of key)*/
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints"); /*(Use for hinting)*/

  var currentProfile;
  switchProfile(1); /*(Getting sounds from HTML the Piano Sound effect)*/
  
  
  hints.forEach(hintsOn);

  keys.forEach((key) => key.addEventListener("transitionend", removeTransition)); /*(As soon as the key done going to fier: "key.addEventListener" an event variable inside of it...)*/

  window.addEventListener("keydown", playNote);


}


function switchProfile(profile) { /*( The function called palynote is going to take an (e))*/
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

  var name = "mm" + currentProfile; /*(The var names are defined for refering to each 'id sound effect name' to work according to conditional orders)*/

  var elm = document.querySelector(`profile[id="${name}"]`);
  console
  var audio = elm.querySelector(`audio[data-key="${e.keyCode}"]`);
  var key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
                              /*(The query selector() method returns the first element which matches the specified selectors)*/
  if (!key) return;

  const keyNote = key.getAttribute("data-note"); /*(Get the value of the data-note event attribute of a <button> element)*/

  key.classList.add("playing");  /*(For determining the pushed key referred to HTML part)*/
  
  audio.currentTime = 0;  /*(If play a key note very fast continuously the note can be play with this command)*/
  audio.play();
  
  var nt = document.querySelector(".nowplaying")
  nt.innerHTML = keyNote;
}

function removeTransition(e) {  /*(For changing the color when the key push)*/
  if (e.propertyName !== "transform") return; /*(For return to initial state color)*/
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}
