let names = [];
const searchbar = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
let list = document.getElementById("tag");
for (let i = 0; i < data.length; i++) {
  let dataForname;
  dataForname = data[i].name;
  names.push(dataForname);
  let option = document.createElement("option");
  option.value = dataForname;
  option.textContent = option.value;
  list.appendChild(option);
}
let searchInput;
let target;
let clicked;
let onEditSelectedOb;
let isOnEditMod;
let editTargetId;
let editTextMemory;
let index;
const $keyname = document.getElementById("name");
const $gram = document.getElementById("gram");
const $link = document.getElementsByClassName("display");
const $example = document.getElementById("popUpDescription");
const $iframe = document.getElementById("iframe");
const $explain = document.getElementById("desc");
const $editButton = document.getElementById("editButton");
const $editableContents = document.getElementsByClassName("memo");
const $editableTemp = document.getElementsByClassName("temp");
const onClick = (event) => {
  clicked = event.target.id;
  loadingSide(clicked);
};
for (let i = 0; i < $link.length; i++) {
  $link[i].addEventListener("click", onClick);
}
//   $keyname.textContent = $h1.name;

function loadingSide(clicked) {
  switch (clicked) {
    case "property":
      popUpProperty();
      break;
    case "sample":
      popUpSample();
      break;
    case "externalLink":
      popUpExternalLink();
      break;
  }
}
function popUpProperty() {
  $iframe.style.display = "none";
  $example.style.display = "block";

  $example.textContent = target.property;
}
function popUpSample() {
  $iframe.style.display = "none";
  $example.style.display = "block";
  $example.textContent = target.sample;
}
function popUpExternalLink() {
  $example.style.display = "none";
  $iframe.style.display = "block";
  $iframe.src = target.link;
}
function loadingMain() {
  $keyname.textContent = target.name;
  $gram.textContent = target.gram;
  $explain.textContent = target.desc;
}
function editMod() {
  searchbar.readOnly = true;
  for (let i = 0; i < 4; i++) {
    if ($editableTemp[0].classList.contains("temp")) {
      $editableTemp[0].classList.add("memo");
      $editableTemp[0].classList.remove("temp");
    }
  }
  for (let i = 0; i < $editableContents.length; i++) {
    $editableContents[i].addEventListener("click", onClickEditable);
  }
}
function editModExit() {
  searchbar.readOnly = false;
  // for (let i = 0; i < $editableContents; i++) {
  //   // if ($editableContents[i].classList.contains("memo")) {
  //   //   $editableContents[i].classList.add("temp");
  //   $editableContents[i].className = "temp";
  // }
  // for (let i = 0; i < $editableContents; i++) {
  //   $editableContents[i].classList.remove("memo");
  // }
  // $editableContents.forEach((content) => {
  //   console.log(content);
  // });
  for (let i = 0; i < 4; i++) {
    if ($editableContents[0].className == "memo") {
      $editableContents[0].classList.add("temp");
      $editableContents[0].classList.remove("memo");
    }
  }
  for (let i = 0; i < $editableContents.length; i++) {
    $editableContents[i].removeEventListener("click", onClickEditable);
  }
}

const onInput = (event) => {
  searchInput = event.target.value;
  console.log(searchInput);
  target = data.find((target) => target.name === searchInput);
  index = data.findIndex((target) => target.name === searchInput);
  console.log(index);
};
const onClickEditable = (event) => {
  onEditSelectedOb = event.target;
  editTargetId = onEditSelectedOb.id;
  editTextMemory = target[editTargetId];
  onEditSelectedOb.style.display = "none";
  let parent = onEditSelectedOb.parentNode;
  let textarea = document.createElement("textarea");
  textarea.id = "nowOnEdit";
  textarea.textContent = editTextMemory;
  parent.appendChild(textarea);
  let input = document.createElement("input");
  input.value = "저장";
  input.style.width = "50px";
  input.type = "button";
  input.style.textAlign = "center";
  input.onclick = () => {
    editTextMemory = textarea.value;
    textarea.remove();
    input.remove();
    onEditSelectedOb.style.display = "block";
    target[self.editTargetId] = editTextMemory;
    console.log(target[self.editTargetId]);
    target[index].editTargetId = editTextMemory;
    loadingMain();
  };
  parent.appendChild(input);
};
searchbar.addEventListener("input", onInput);

// function saveChange(self) {
//   self.editTextMemory = self.textarea.textContent;
//   self.textarea.remove();
//   self.onEditSelectedOb.style.display = "block";
//   self.target[self.editTargetId] = self.editTextMemory;
//   loadingMain();
// }
function editButtonClicked(event) {
  if (event.target.textContent === "편집") {
    event.target.textContent = "완료";
    editMod();
  } else {
    event.target.textContent = "편집";
    editModExit();
  }
}
