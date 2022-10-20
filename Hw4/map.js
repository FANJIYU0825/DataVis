const FWith = 600,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
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

d3.csv("data/NBA.csv", d3.autoType).then(function (data) {
  d3.json("data/us-states.json")
    .then(function (usa) {
      drawUsa(usa, data);
    })
    .then(function () {
      g1.append("text")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + 20)
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .text("umapX");

      //y
      const y = d3
        .scaleLinear()
        .domain([d3.min(data, (d) => d.umapY), d3.max(data, (d) => d.umapY)])
        .range([HEIGHT, 0]);
      const x = d3
        .scaleLinear()
        .domain([d3.min(data, (d) => d.umapY), d3.max(data, (d) => d.umapY)])
        .range([0, WIDTH]);
      // Y label
      g1.append("text")
        .attr("x", -(HEIGHT / 2))
        .attr("y", -20)
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("umapY");
      const yAxisCall = d3.axisLeft(y);
      const xAxisCall = d3.axisBottom(x);
      g1.append("g").call(yAxisCall)
      g1.append("g")
      .call(xAxisCall).attr("transform", "translate(0,"+HEIGHT+")")
      
     
    });
});

function scatter() {}

/*

*/
function drawUsa(Usa, data) {
  //usmap
  var projection = d3.geoMercator().fitExtent(
    [
      [0, 0],
      [WIDTH, HEIGHT],
    ],
    Usa
  );

  var geoGenerator = d3.geoPath().projection(projection);

  g2.selectAll("path")
    .data(Usa.features)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("fill", "steelblue")
    .attr("d", geoGenerator)
    .attr("transform", "scale(.6,.6)");

  data.forEach(function (d) {
    d.lon = Number(d.lon);
    d.lat = Number(d.lat);
    g2.attr("class", "citytext")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function (d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr("y", function (d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr("dy", -7)
      .style("fill", "black") // fill the text with the colour black
      .attr("text-anchor", "middle") // set anchor y justification
      .text(function (d) {
        return d.team_abbreviation;
      })
      .attr("transform", "scale(.6,.6)");
    g2.append("circle")
      .attr("id", "citycircle")
      .attr("cx", projection([d.lon, d.lat])[0])
      .attr("cy", projection([d.lon, d.lat])[1])
      .attr("fill", "red")
      .attr("r", 10)
      .attr("transform", "scale(.6,.6)");
  });
}
