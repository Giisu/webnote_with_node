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
let link;
let clickLinkId;
let iframe;
let getSizeBtn;
let division;
let mousePos = { x: undefined, y: undefined };
let newBtn;
let deleteBtn;
let nowOnCreating = false;
let textareas;

document.addEventListener("DOMContentLoaded", (event) => {
  editButton = document.getElementById("editButton");
  editableMemo = document.getElementsByClassName("memo");
  editableTemp = document.getElementsByClassName("temp");
  editButton.addEventListener("click", onClickEdit);
  deleteBtn = document.getElementById("delete");
  deleteBtn.addEventListener("click", areYouSureToDelete);
  link = document.getElementsByClassName("display");
  iframe = document.getElementById("iframe");
  getSizeBtn = document.getElementById("getSize");
  newBtn = document.getElementById("new");
  newBtn.addEventListener("click", createNew);
  // const showSize = () => {
  //   console.log(division.getBoundingClientRect());
  // };
  getSizeBtn.addEventListener("click", showSize);
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", clickLink);
  }
  // window.addEventListener("mousemove", (event) => {
  //   mousePos = { x: event.clientX, y: event.clientY };
  //   console.log(mousePos);
  // });
});

const areYouSureToDelete = () => {
  function waitForCheck(callback) {
    return new Promise((resolve, reject) => {
      let confirm = window.confirm(
        `Are you sure to delete this content? : "` + `${deleteBtn.value}"`
      );
      if (confirm !== undefined && confirm !== null) {
        resolve(confirm);
      }
    });
  }

  waitForCheck().then((confirm) => {
    if (confirm) {
      let form = document.createElement("form");
      form.setAttribute("action", "/delete");
      document.body.appendChild(form);
      form.submit();
    } else {
      return;
    }
  });
};

function addExternalLinks(event) {
  console.log("링크추가");
  let count = 0;
  let section = document.createElement("section");
  let buttonPlus = document.createElement("button");
  let buttonMinus = document.createElement("button");
  let buttonSubmit = document.createElement("button");
  buttonSubmit.textContent = "Save Links";
  buttonSubmit.addEventListener("click", () => {
    let input = document.createElement("input");
    input.name = "count";
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/link");
    let links = document.getElementsByClassName("link");
    input.value = links.length;
    for (let i = 0; i < input.value; i++) {
      links[0].name = "link" + (i + 1);
      form.appendChild(links[0]);
    }
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

    // sendGetArray(links, "/link");
  });
  buttonPlus.textContent = "+";
  buttonMinus.textContent = "-";
  let parentNode = event.target.parentNode;
  parentNode.appendChild(buttonPlus);
  parentNode.appendChild(buttonMinus);
  parentNode.appendChild(buttonSubmit);
  parentNode.appendChild(section);
  section.style.display = "flex";
  section.style.flexDirection = "column";
  const addAndRemoveInput = (PlusOrMinus) => {
    let input = document.createElement("input");
    input.classList.add("link");
    switch (PlusOrMinus) {
      case "plus":
        section.appendChild(input);
        break;
      case "minus":
        section.removeChild(section.lastChild);
    }
  };

  buttonPlus.addEventListener("click", () => {
    let PlusOrMinus = "plus";
    if (count > 4) {
      count = count;
    } else {
      addAndRemoveInput(PlusOrMinus);
      count++;
    }
  });
  buttonMinus.addEventListener("click", () => {
    let PlusOrMinus = "minus";
    if (count < 1) {
      count = count;
    } else {
      addAndRemoveInput(PlusOrMinus);
      count--;
    }
  });
}

const clickLink = (event) => {
  clickLinkId = event.target.id;
  switch (clickLinkId) {
    case "property":
      console.log("property");
      iframe.src = "/note.html";
      break;
    case "sample":
      console.log("sample");
      break;
    case "externalLink":
      addExternalLinks(event);
      break;
  }
};

const createNew = () => {
  let newText = [];
  if (nowOnCreating) {
    newBtn.textContent = "new";
    nowOnCreating = false;
    let form = document.createElement("form");
    textareas = document.getElementsByClassName("textarea_temp");
    const length = textareas.length;
    // input.name = "newText";
    // input.value = newText;
    // input2.name = "existingText";
    // input2.value = text;
    for (let i = 0; i < length; i++) {
      form.appendChild(textareas[0]);
    }
    form.setAttribute("method", "post");
    form.setAttribute("action", "/new");
    document.body.appendChild(form);
    form.submit();
    // form.appendChild(input);
    // form.appendChild(input2);
    // form.setAttribute("method", "post");
    // form.setAttribute("action", "/edit");
    // document.body.appendChild(form);
    // form.submit();
  } else {
    nowOnCreating = true;
    newBtn.textContent = "save";
    let button = document.createElement("input");
    for (let i = 0; i < editableTemp.length; i++) {
      let object = editableTemp[i];
      object.textContent = object.id + "...";
      let textarea = document.createElement("textarea");
      textarea.addEventListener("input", (event) => {
        newText[i] = event.target.value;
      });
      let parentObject = object.parentNode;
      textarea.name = object.id;
      textarea.classList.add("textarea_temp");
      textarea.textContent = object.textContent;
      object.insertAdjacentElement("beforebegin", textarea);
      object.style.display = "none";
    }
  }
};

const editContent = (event) => {
  let object = event.target;
  let text = object.textContent;
  let newText = text;
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

// function sendGetArray(object, path) {
//   function waitForCheck(callback) {
//     return new Promise((resolve, reject) => {
//       let form = document.createElement("form");
//       let p = document.createElement("p");
//       p.name = "count";
//       p.textContent = object.length;
//       const objLength = object.length;
//       form.setAttribute("method", "post");
//       form.setAttribute("action", `${path}`);
//       for (let i = 0; i < objLength; i++) {
//         form.appendChild(object[0]);
//         form.appendChild(p);
//       }
//       if (form.length === objLength) {
//         resolve(form);
//       }
//     });
//   }
//   waitForCheck().then((form) => {
//     document.body.appendChild(form);
//     console.log(form);
//     form.submit();
//   });
// }
