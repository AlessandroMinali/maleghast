let shift = "-1";
let canvas = document.querySelector("#canvas");

function GenerateCanvas(sizeX, sizeY) {
  for(let y = 0; y < sizeY; y++) {
    let tr = document.createElement("tr");
    for(let x = 0; x < sizeX; x++) {
      let td = document.createElement("td");
      tr.appendChild(td);
      
      td.addEventListener("mouseover", (e) => {
        if(e.buttons == 1)
          Draw(e.target);
      });
      
      td.addEventListener("mousedown", (e) => {
        if(e.buttons == 1)
          Draw(e.target);
      });
    }
    canvas.appendChild(tr);
  }
  }

function Draw(target) {
  if (shift ==  -1) {
    target.style.background = '';
    return;
  }
  target.style.background = "url(\"spritesheet.png\")";
  target.style.backgroundPosition = `${shift}px 0px`
  target.style.backgroundSize = "280px 40px";
}

function GenerateBrushes(brushes) {
  brushes.forEach((b, index) => {
    let wrapper = document.createElement("div");
    let brushElem = document.createElement("div");
    brushElem.setAttribute("data-brush", b[1]);
    if (index != 0) {
      brushElem.style.background = "url(\"spritesheet.png\")";
      brushElem.style.backgroundPosition = `${(index - 1) * -50 / 2}px 0px`
      brushElem.style.backgroundSize = "175px 25px";
    } else {
      brushElem.style.background = 'white';
    }
    wrapper.appendChild(brushElem);
    let brushDesc = document.createElement("div");
    brushDesc.innerText = b[0];
    wrapper.appendChild(brushDesc);
    brushesContainer.appendChild(wrapper);
    
    brushElem.addEventListener("click", (e) => {
      shift = e.target.getAttribute("data-brush");
      brush.innerText = b[0];
    })
  });
}

const urlParams = new URLSearchParams(window.location.search);
const customWidth = urlParams.get('w');
const customHeight = urlParams.get('h');
if (customWidth && customHeight) {
  GenerateCanvas(
    Number(customWidth),
    Number(customHeight)
  );
} else {
  GenerateCanvas(8, 8);
}
GenerateBrushes([
  ['Empty', -1],
  ...[
    ['Terrain', 0],
    ['Elevation', 1],
    ['Hazard', 2],
    ['Objective', 3],
    ['Special', 4],
    ['Stairs', 5],
    ['Wall', 6]
  ].map((x) => { x[1] *= -40; return x})]);
