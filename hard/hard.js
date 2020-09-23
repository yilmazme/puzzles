var canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d"),
  parts = [],
  img = new Image();

img.onload = split_4;
img.crossOrigin = "anonymous";

function split_4() {
  var w2 = img.width / 4,
    h2 = img.height / 4;
  var y;
  for (var i = 0; i < 16; i++) {
    var x = (-w2 * i) % (w2 * 4);
    if (h2 * i < 4 * h2) {
      y = 0;
    } else if (h2 * i < 8 * h2) {
      y = -h2;
    } else if (h2 * i < 12 * h2) {
      y = -2 * h2;
    } else {
      y = -3 * h2;
    }

    canvas.width = w2;
    canvas.height = h2;

    ctx.drawImage(this, x, y, w2 * 4, h2 * 4);

    parts.push(canvas.toDataURL());
  }
}

//img.src = "my.jpeg";
img.src = "https://picsum.photos/480";

var pot1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var pot2 = pot1.sort(function (a, b) {
  return 0.5 - Math.random();
});
console.log(pot2);
const empties = document.querySelectorAll(".empty");

window.addEventListener("load", () => {
  for (var i = 0; i < 16; i++) {
    var imgParts = document.createElement("img");
    imgParts.src = parts[i];
    var att = document.createAttribute("draggable");
    att.value = "true";
    imgParts.setAttributeNode(att);
    var find = document.createAttribute("number");
    find.value = i;
    imgParts.setAttributeNode(find);
    empties[pot2[i]].appendChild(imgParts);
  }
});

//after creating canvas, this part dor drag and drop
var images;
window.addEventListener("load", () => {
  setTimeout(() => {
    images = document.getElementsByTagName("img");
    for (const image of images) {
      image.addEventListener("dragstart", dragStart);
      image.addEventListener("dragend", dragEnd);
    }
  }, 1000);
});

// dragged element handlers

function dragStart() {
  this.className += " hold";
  this.setAttribute("id", "choosen");
  setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
  this.className = "";
  this.removeAttribute("id");
}

// Loop targets
for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}

// Drag target functions

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault(); //not obligattory

  this.className += " hovered";
}

function dragLeave() {
  this.className = "empty";
}

function dragDrop(e) {
  e.preventDefault();
  this.className = "empty";
  if (this.children.length) {
    return false;
  }
  for (var i = 0; i < 16; i++) {
    if (images[i].hasAttribute("id")) {
      this.append(images[i]);
    }
  }
}
//time
const timer = document.querySelector("#timer");
const myTime = setInterval(timeFunction, 1000);
var time = 0;
function timeFunction() {
  time++;
  timer.innerHTML = `${time} Sec`;
}
// for game statu

const msg = document.getElementById("msg");

window.addEventListener("drop", result);

function result() {
  if (
    empties[16].children.length &&
    empties[17].children.length &&
    empties[18].children.length &&
    empties[19].children.length &&
    empties[20].children.length &&
    empties[21].children.length &&
    empties[22].children.length &&
    empties[23].children.length &&
    empties[24].children.length &&
    empties[25].children.length &&
    empties[26].children.length &&
    empties[27].children.length &&
    empties[28].children.length &&
    empties[29].children.length &&
    empties[30].children.length &&
    empties[31].children.length
  ) {
    if (
      empties[16].getAttribute("id") ===
        empties[16].firstChild.getAttribute("number") &&
      empties[17].getAttribute("id") ===
        empties[17].firstChild.getAttribute("number") &&
      empties[18].getAttribute("id") ===
        empties[18].firstChild.getAttribute("number") &&
      empties[19].getAttribute("id") ===
        empties[19].firstChild.getAttribute("number") &&
      empties[20].getAttribute("id") ===
        empties[20].firstChild.getAttribute("number") &&
      empties[21].getAttribute("id") ===
        empties[21].firstChild.getAttribute("number") &&
      empties[22].getAttribute("id") ===
        empties[22].firstChild.getAttribute("number") &&
      empties[23].getAttribute("id") ===
        empties[23].firstChild.getAttribute("number") &&
      empties[24].getAttribute("id") ===
        empties[24].firstChild.getAttribute("number") &&
      empties[25].getAttribute("id") ===
        empties[25].firstChild.getAttribute("number") &&
      empties[26].getAttribute("id") ===
        empties[26].firstChild.getAttribute("number") &&
      empties[27].getAttribute("id") ===
        empties[27].firstChild.getAttribute("number") &&
      empties[28].getAttribute("id") ===
        empties[28].firstChild.getAttribute("number") &&
      empties[29].getAttribute("id") ===
        empties[29].firstChild.getAttribute("number") &&
      empties[30].getAttribute("id") ===
        empties[30].firstChild.getAttribute("number") &&
      empties[31].getAttribute("id") ===
        empties[31].firstChild.getAttribute("number")
    ) {
      msg.style.visibility = "visible";
      clearInterval(myTime);
    } else {
      return null;
    }
  }
}
