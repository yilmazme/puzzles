var canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d"),
  parts = [],
  img = new Image();

img.onload = split_4;
img.crossOrigin = "anonymous";

function split_4() {
  var w2 = img.width / 3,
    h2 = img.height / 3;
  var y;
  for (var i = 0; i < 9; i++) {
    var x = (-w2 * i) % (w2 * 3);
    if (h2 * i < 3 * h2) {
      y = 0;
    } else if (h2 * i < 6 * h2) {
      y = -h2;
    } else {
      y = -2 * h2;
    }

    canvas.width = w2;
    canvas.height = h2;

    ctx.drawImage(this, x, y, w2 * 3, h2 * 3);

    parts.push(canvas.toDataURL());
  }
}

//img.src = "my.jpeg";
img.src = "https://picsum.photos/480";

var pot1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var pot2 = pot1.sort(function (a, b) {
  return 0.5 - Math.random();
});
console.log(pot2);
const empties = document.querySelectorAll(".empty");

window.addEventListener("load", () => {
  for (var i = 0; i < 9; i++) {
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
  for (var i = 0; i < 9; i++) {
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
    empties[9].children.length &&
    empties[10].children.length &&
    empties[11].children.length &&
    empties[12].children.length &&
    empties[13].children.length &&
    empties[14].children.length &&
    empties[15].children.length &&
    empties[16].children.length &&
    empties[17].children.length
  ) {
    if (
      empties[9].getAttribute("id") ===
        empties[9].firstChild.getAttribute("number") &&
      empties[10].getAttribute("id") ===
        empties[10].firstChild.getAttribute("number") &&
      empties[11].getAttribute("id") ===
        empties[11].firstChild.getAttribute("number") &&
      empties[12].getAttribute("id") ===
        empties[12].firstChild.getAttribute("number") &&
      empties[13].getAttribute("id") ===
        empties[13].firstChild.getAttribute("number") &&
      empties[14].getAttribute("id") ===
        empties[14].firstChild.getAttribute("number") &&
      empties[15].getAttribute("id") ===
        empties[15].firstChild.getAttribute("number") &&
      empties[16].getAttribute("id") ===
        empties[16].firstChild.getAttribute("number") &&
      empties[17].getAttribute("id") ===
        empties[17].firstChild.getAttribute("number")
    ) {
      msg.style.visibility = "visible";
      clearInterval(myTime);
    } else {
      return null;
    }
  }
}
