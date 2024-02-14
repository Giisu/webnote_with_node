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
// readfile은 직렬화된 데이터
const jsonData = JSON.parse(jsonFile);
const data = jsonData.datas;
let index = 0;
//////////////////////////////
// const stringData = JSON.stringify(jsonFile);
// console.log(stringData);
// const text = "테스트용";
// Data[0].name = text;
// console.log(stringData[0].name);
// fs.writeFile("data/data.json", data, "utf-8", function (err) {
//   console.log("쓰기작업 완료");
// });
//////////////////////////////
// const datas = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
// console.log(datas);
// console.log(typeof datas);
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
app.get(["/note"], function (req, res) {
  let itemName = req.body.name;
  //   fs.readFile("public/note.html", function (err, data) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send("error");
  //     }
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.end(data);
  //   });
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === itemName) {
      index = i;
    }
  }
  res.render("note.jade", { data: data, index: index });
});
