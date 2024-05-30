import './style.css';
import 'highlight.js/styles/dark.css';
// initialize the highlighter
import hljs from 'highlight.js';

hljs.highlightAll();
// whatsapp button js

let form = document.querySelector("form");
let btnSubmit = document.querySelector("[type='submit']");
let phone = document.querySelector("#phone");
let text = document.querySelector("#text");
let id = document.querySelector("#id");
let size = document.querySelector("#size");
let marginLeftRight = document.querySelector("#marginLeftRight");
let marginTopBottom = document.querySelector("#marginTopBottom");
let resultCode = document.querySelector("pre code.language-html");
let waLinkEl = document.querySelector("#whatsapp-button a");

// defining deafult values from html
let maxMargin = parseInt(marginTopBottom.max);
marginLeftRight.value = maxMargin - parseInt(waLinkEl.style.right);
marginTopBottom.value = maxMargin - parseInt(waLinkEl.style.bottom);
size.value = parseInt(waLinkEl.style.width);
// ---------------------------------

// rebuild the code when input info is changed
[phone, text, id, size, marginLeftRight, marginTopBottom].forEach((el) => {
  el.addEventListener("input", (e) => {
    resultCode.innerText = '';
    btnSubmit.click();
  });
});

// updating the button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newLink = new URL(waLinkEl.href);
  let params = newLink.searchParams;

  params.delete("text");
  params.set("phone", phone.value);
  if (text.value) params.set("text", text.value);

  waLinkEl.href = newLink.toString();
  waLinkEl.id = id.value;

  console.log(waLinkEl.outerHTML);
  resultCode.innerHTML = hljs.highlight(waLinkEl.outerHTML, {language: 'xml'}).value
  // resultCode.innerText = waLinkEl.outerHTML;
  // console.log(hljs);
});

// size slider
size.addEventListener("input", (e) => {
  let value = e.target.value;
  waLinkEl.style.width = value + "px";
});

// margin left/right slider
marginLeftRight.addEventListener("input", (e) => {
  let value = e.target.value;
  let newValue = convertNewValue(value);

  // margin right
  if (value >= 0) {
    waLinkEl.style.removeProperty("left");
    waLinkEl.style.right = newValue + "px";
  }
  // margin left
  else {
    waLinkEl.style.removeProperty("right");
    waLinkEl.style.left = newValue + "px";
  }
});

// margin top/bottom slider
marginTopBottom.addEventListener("input", (e) => {
  let value = e.target.value;
  let newValue = convertNewValue(value);

  // margin bottom
  if (value >= 0) {
    waLinkEl.style.removeProperty("top");
    waLinkEl.style.bottom = newValue + "px";
  }
  // margin top
  else {
    waLinkEl.style.removeProperty("bottom");
    waLinkEl.style.top = newValue + "px";
  }
});

// text selection on click for easier copy
resultCode.addEventListener("click", function () {
  if (window.getSelection().toString() == "")
    window.getSelection().selectAllChildren(this);
});

// slider value converter
let convertNewValue = (value) => {
  value = parseInt(value);
  let offset = value >= 0 ? -maxMargin : maxMargin + 1;
  let newValue = (value + offset) * -1;
  return newValue < 0 ? newValue * -1 : newValue;
};
