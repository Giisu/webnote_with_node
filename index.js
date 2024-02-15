// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const bodyParser = require("body-parser");
import express from "express";
import fs from "fs";
// import path from "path";
import bodyParser from "body-parser";
import dataObject from "./data/data.json" assert { type: "json" };
const jsonFile = fs.readFileSync("data/data.json", "utf-8");
const filename = "data/data.json";
// readfile은 직렬화된 데이터
const jsonData = JSON.parse(jsonFile);
///////////////////JSON파일 수정//////////////////////

// if(jsonData[index].keyAnchor !== "test") {
//   jsonData[1].name = "test";
//   console.log(jsonData[0].name);
//   fs.writeFileSync("data/data2.json", JSON.stringify(jsonData, null, 2));
// }

/////////////////////////////////////////////////////

let index = 0;
let newText;
let existingText;
let editMode = false;
let keyAnchor;
const app = express();
// const htmlpath = path.resolve(__dirname + "/public/note.html");
// const datapath = path.resolve(__dirname + "/data/data.json");
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set("view engine", "jade");
app.set("views", "./views");
app.use(express.static("public"));
// const data = require("/data.json");
// import * as data from "/data.json";
app.listen(3000, function () {
  console.log("connected port 3000");
});
app.get(["/note", "/note/:search"], function (req, res) {
  let itemName = req.query.search;

  for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].name === itemName) {
      index = i;
    }
  }

  res.render("note.jade", { data: jsonData, index: index });
});

app.post("/new", (req, res) => {
  let name = req.body.name;
  let desc = req.body.desc;
  let gram = req.body.gram;
  let popUpDescription = req.body.popUpDescription;
  let newData = {
    name: name,
    desc: desc,
    gram: gram,
    property: popUpDescription,
  };
  jsonData.push(newData);
  fs.writeFileSync("data/data.json", JSON.stringify(jsonData, null, 2));
  index = jsonData.length - 1;
  res.redirect(`/note?search=${jsonData[index].name}`);
});

app.post("/edit", function (req, res) {
  newText = req.body.newText;
  existingText = req.body.existingText;
  for (let key in jsonData[index]) {
    if (existingText === jsonData[index][key]) {
      keyAnchor = key;
    }
  }

  jsonData[index][keyAnchor] = newText;
  fs.writeFileSync("data/data.json", JSON.stringify(jsonData, null, 2));

  res.redirect(`/note?search=${jsonData[index].name}`);
});

app.post("/link", (req, res) => {
  let links = [];
  for (let i = 1; i <= req.body.count; i++) {
    let path = eval("req.body.link" + i);
    links.push(path);
  }
  console.log(links);
});

app.get("/delete", (req, res) => {
  jsonData.splice(index, 1);
  fs.writeFileSync("data/data.json", JSON.stringify(jsonData, null, 2));
  res.redirect(`/note?search=${jsonData[0].name}`);

  // let result = res.write(
  //   `<script>window.confirm('Are you sure to delete this item? : ${jsonData[index].name}')</script>`
  // );
  //     );
  // function waitForCheck(callback) {
  //   return new Promise((resolve, reject) => {
  //     let result = res.write(
  //       `<script>window.confirm('Are you sure to delete this item? : ${jsonData[index].name}')</script>`
  //     );
  //     if (result !== undefined && result !== null) {
  //       console.log(result);
  //       resolve(result);
  //     }
  //   });
  // }

  // waitForCheck().then((result) => {
  //   if (result) {
  //     console.log("확인");
  //   } else {
  //     console.log("취소");
  //   }
  // });

  // if (result) {
  //   // jsonData.splice(index, 1);
  //   // fs.writeFileSync("data/data.json", JSON.stringify(jsonData, null, 2));
  //   res.redirect(`/note?search=${jsonData[0].name}`);
  // } else {
  //   res.redirect(`/note?search=${jsonData[index].name}`);
  // }
});

// Object.keys(jsonData[index]).forEach((value) => {
//   console.log(value[value]);
// });
