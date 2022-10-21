const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
function svgbuilder(FWith,FLeftTopX,MARGIN,WIDTH,HEIGHT){
    const svg1 = d3
  .select("#scatter")
  .append("svg")
  .attr("width", FWith - 150)
  .attr("height", FHeight);

const g1 = svg1
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
}

const svg2 = d3
  .select("#maparea")
  .append("svg")
  .attr("width", FWith - 150)
  .attr("height", FHeight);

const g2 = svg2
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
const svg3 = d3
  .select("#area1")
  .append("svg")
  .attr("width", 400)
  .attr("height", FHeight);

const g3 = svg3
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP}) `
  );
const svg4 = d3
  .select("#area2")
  .append("svg")
  .attr("width", 400)
  .attr("height", FHeight);

const g4 = svg4
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
const svg5 = d3
  .select("#area3")
  .append("svg")
  .attr("width", 400)
  .attr("height", FHeight);

const g5 = svg5
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
const svg6 = d3
  .select("#area6")
  .append("svg")
  .attr("width", 400)
  .attr("height", FHeight);

const g6 = svg6
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );

d3.csv("data/NBA.csv", d3.autoType).then(function (data) {
  d3.json("data/us-states.json")
    .then(function (usa) {

      drawUsa(usa, data);
      draw_scatt(data, g1);
      draw_histamgram(data, g3);
      draw_histamgram(data, g4);
      draw_histamgram(data, g5);
      draw_histamgram(data, g5);
    })
    .then(function () {})
    .then(function () {});
});

function draw_scatter() {}

/*

*/
