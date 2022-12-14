import { brush_scatter } from "./interaction.js";
import { top_tip } from "./interaction.js";

const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

var tip = top_tip();
export function draw_scatt(data, g, filter) {
  //text

  // var brush=brush_scatter(g);

  var legenuse = g.append("g");

  g.append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("umapX");
  // yscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.umapY), d3.max(data, (d) => d.umapY)])
    .range([HEIGHT, 0]);
  //xscale
  const xscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.umapX), d3.max(data, (d) => d.umapX)])
    .range([0, HEIGHT]);

  // circle size change by the mean
  const radiusscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.ptsNorm), d3.max(data, (d) => d.ptsNorm)])
    .range([0, d3.mean(data, (d) => d.umapX + d.umapY)]);

  // color change compare by three norm
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3])
    .range(["green", "red", "blue"]);
  // legendColor
  var circle = d3.symbol().type(d3.symbolCircle)();

  var legendboard = d3
    .scaleOrdinal()
    .domain(["reb", "pts", "ast", "r:avg"])
    .range(["green", "red", "blue", "white"]);

  // Y label
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("umapY");
  //產生xylabel
  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").call(yAxisCall);
  g.append("g")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove
  g.selectAll("text").remove();

  var legendLinear = d3
    .legendColor()
    .shape("path", circle)
    .orient("vertical")
    .scale(legendboard);
  //legendLinear generate

  var circleG = g.append("g");

  legenuse
    .append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(4,20)");

  legenuse.selectAll(".legendLinear").call(legendLinear);
  var circles = g
    .append("g")

    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      return xscale(d.umapX);
    })
    .attr("cy", function (d) {
      return yscale(d.umapY);
    })
    .attr("r", function (d) {
      return radiusscale((d.ptsNorm + d.rebNorm + d.astNorm) / 3);
    })
    .style("fill", function (d) {
      if (d.ptsNorm > d.rebNorm && d.ptsNorm > d.astNorm) {
        return colorscale(1);
      } else if (d.ptsNorm < d.rebNorm && d.rebNorm > d.astNorm) {
        return colorscale(0);
      } else if (d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm) {
        return colorscale(2);
      }
    });

  // circleG.call(brush)

  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  return { xscale: xscale, yscale: yscale, circle: circles, circleG: circleG };
}
export function draw_scatt1(data, g, filter) {
  //text
  
  g.selectAll(".scatterYa").remove();
  g.selectAll(".scatterXa").remove();
  // var brush = brush_scatter(g);

  var legenuse = g.append("g");

  g.append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("umapX");
  // yscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(filter, (d) => d.umapY), d3.max(filter, (d) => d.umapY)])
    .range([HEIGHT, 0]);
  //xscale
  const xscale = d3
    .scaleLinear()
    .domain([d3.min(filter, (d) => d.umapX), d3.max(filter, (d) => d.umapX)])
    .range([0, HEIGHT]);

  // circle size change by the mean
  const radiusscale = d3
    .scaleLinear()
    .domain([d3.min(filter, (d) => d.ptsNorm), d3.max(filter, (d) => d.ptsNorm)])
    .range([0, d3.mean(filter, (d) => d.umapX + d.umapY)]);

  // color change compare by three norm
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3])
    .range(["green", "red", "blue"]);
  // legendColor
  var circle = d3.symbol().type(d3.symbolCircle)();

  var legendboard = d3
    .scaleOrdinal()
    .domain(["reb", "pts", "ast", "r:avg"])
    .range(["green", "red", "blue", "white"]);

  // Y label
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("umapY");
  //產生xylabel
  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove
  g.selectAll("text").remove();

  var legendLinear = d3
    .legendColor()
    .shape("path", circle)
    .orient("vertical")
    .scale(legendboard);
  //legendLinear generate

  var circleG = g.append("g");

  legenuse
    .append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(4,20)");

  legenuse.selectAll(".legendLinear").call(legendLinear);
  var circles = g
    .append("g")

    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      return xscale(d.umapX);
    })
    .attr("cy", function (d) {
      return yscale(d.umapY);
    })
    .attr("r", function (d) {
      return radiusscale((d.ptsNorm + d.rebNorm + d.astNorm) / 3);
    })
    .style("fill", function (d) {
      if (d.ptsNorm > d.rebNorm && d.ptsNorm > d.astNorm) {
        return colorscale(1);
      } else if (d.ptsNorm < d.rebNorm && d.rebNorm > d.astNorm) {
        return colorscale(0);
      } else if (d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm) {
        return colorscale(2);
      }
    });

  // circleG.call(brush);

  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  return { xscale: xscale, yscale: yscale, circle: circles, circleG: circleG };
}
