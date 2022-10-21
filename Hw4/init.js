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
  .attr("width", FWith )
  .attr("height", FHeight);

const g2 = svg2
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );


function frame_init(area) {
  const svg = d3
    .select("#"+area+"")
    .append("svg")
    .attr("width", 300)
    .attr("height", FHeight);

  const g = svg
    .append("g")
    .attr(
      "transform",
      `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})scale(.7,.7)`
    );
  return g
}
