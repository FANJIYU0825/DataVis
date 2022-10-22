import { drawUsa } from "./drawmap.js";
// import {frame_init} from './init.js'
import { draw_scatt } from "./drawscatter.js";
import { draw_histamgram } from "./drawHitogram.js";

const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
const svg1 = d3
  .select("#scatter")
  .append("svg")
  .attr("width", FWith - 300)
  .attr("height", FHeight);

const g1 = svg1
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
const svg2 = d3
  .select("#maparea")
  .append("svg")
  .attr("width", FWith)
  .attr("height", FHeight);

const g2 = svg2
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP}) `
  );
var g3 = frame_init("area1");
var g4 = frame_init("area2");
var g5 = frame_init("area3");
var g6 = frame_init("area4");
var g7 = frame_init("area5");
var g8 = frame_init("area6");
function frame_init(area) {
  const svg = d3
    .select("#" + area + "")
    .append("svg")
    .attr("width", FHeight)
    .attr("height", FHeight);

  const g = svg
    .append("g")
    .attr(
      "transform",
      `translate(${FLeftTopX + MARGIN.LEFT}, ${
        FLeftTopY + MARGIN.TOP
      })scale(.9,.6) `
    );
  return g;
}

d3.csv(
  "https://gist.githubusercontent.com/FANJIYU0825/116526c0af36be0866e7a99a7668e28c/raw/4269f88eba4588f5cb60b3a931e377d408422a6b/NBA.csv",
  d3.autoType
).then(function (data) {
  d3.json(
    "https://gist.githubusercontent.com/FANJIYU0825/11c93f8bf083adf57ed4332f1884ef9e/raw/d583353cde40462ccb799352d64ba440dca44ab7/us-states.json"
  )
    .then(function (usa) {
      drawUsa(usa, data, g2, WIDTH, HEIGHT);
      draw_scatt(data, g1);
      draw_histamgram(data, g3, "pts", FHeight, HEIGHT,40);
      draw_histamgram(data, g4, "reb", FHeight, HEIGHT,30);
      draw_histamgram(data, g5, "ast", FHeight, HEIGHT,30);
      draw_histamgram(data, g6, "age", FHeight, HEIGHT,30);
      draw_histamgram(data, g7, "gp", FHeight, HEIGHT,40);
      draw_histamgram(data, g8, "draft_number", FHeight, HEIGHT,30);
    })
    .then(function () {})
    .then(function () {});
});

/*

*/
