// function goPost(self) {
//   let form = document.createElement("form");
//   form.setAttribute("method", "post");
//   form.setAttribute("action", "/note");
//   form.appendChild(self);
//   document.body.appendChild(form);
//   form.submit();
//   console.log("제출");
//   console.log(form);
// }
let editButton;
let editableMemo;
let editableTemp;

document.addEventListener("DOMContentLoaded", (event) => {
  editButton = document.getElementById("editButton");
  editableMemo = document.getElementsByClassName("memo");
  editableTemp = document.getElementsByClassName("temp");
  editButton.addEventListener("click", onClickEdit);
});

const editContent = (event) => {
  let newText;
  let object = event.target;
  let text = object.textContent;
  let textarea = document.createElement("textarea");
  let parentObject = object.parentNode;
  let button = document.createElement("input");
  textarea.addEventListener("input", (event) => {
    newText = event.target.value;
  });
  button.type = "button";
  button.onclick = () => {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let input2 = document.createElement("input");
    input.name = "newText";
    input.value = newText;
    input2.name = "existingText";
    input2.value = text;
    form.appendChild(input);
    form.appendChild(input2);
    form.setAttribute("method", "post");
    form.setAttribute("action", "/edit");
    document.body.appendChild(form);
    form.submit();
  };
  button.value = "save";
  button.style.border = "1px solid black";

  //   function goPost(self) {
  //     let form = document.createElement("form");
  //     form.setAttribute("method", "post");
  //     form.setAttribute("action", "/note");
  //     form.appendChild(self);
  //     document.body.appendChild(form);
  //     form.submit();
  //     console.log("제출");
  //     console.log(form);
  //   }

  textarea.textContent = text;
  object.insertAdjacentElement("beforebegin", textarea);
  textarea.insertAdjacentElement("beforebegin", button);
  object.style.display = "none";
};

const onClickEdit = function (event) {
  if (event.target.textContent == "edit") {
    event.target.textContent = "save";
    for (let i = 0; i < 4; i++) {
      editableTemp[0].addEventListener("click", editContent);
      editableTemp[0].classList.add("memo");
      editableTemp[0].classList.remove("temp");
    }
  } else if (event.target.textContent == "save") {
    event.target.textContent = "edit";
    for (let i = 0; i < 4; i++) {
      editableMemo[0].removeEventListener("click", editContent);
      editableMemo[0].classList.add("temp");
      editableMemo[0].classList.remove("memo");
    }
  }
};
