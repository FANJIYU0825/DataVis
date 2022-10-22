const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
export function draw_scatt(data, g, filter) {
  //text
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
  const circle = d3.symbol().type(d3.symbolCircle)();

  const legendboard = d3
    .scaleOrdinal()
    .domain(["reb", "pts", "ast",'r:avg'])
    .range(["green", "red", "blue",'white']);

  g.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(13,20)");
  
  const legendLinear = d3
    .legendColor()
    .shape("path",circle)
    .orient("vertical")
    .scale(legendboard);

 

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

  g.append("g").call(yAxisCall);
  g.append("g")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

 // makesure the text is remove
  g.selectAll("text").remove();


 
  g.select(".legendLinear").call(legendLinear);
  g.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
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
}
