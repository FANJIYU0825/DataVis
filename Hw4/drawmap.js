
const FWith = 800,
FHeight = 400;
const FLeftTopX = 10,
FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
const svg2 = d3
  .select("#maparea")
  .append("svg")
  .attr("width", FWith)
  .attr("height", FHeight);

const g2 = svg2
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
  // count the size of every team and return the value of every team lengh
  function Num_Player(data,teamID){

    var team =d3.group(data,d=>d.team_abbreviation)
    return team.get(teamID).length
 }
export function drawUsa(Usa, data) {
  //usmap
  var projection = d3.geoMercator().fitExtent(
    [
      [-305, 20],
      [WIDTH + 160, HEIGHT + 180],
    ],
    Usa
  );

  var geoGenerator = d3.geoPath().projection(projection);
  var circlescale =d3.scaleLinear().domain([0,8]).range([0,8])
  g2.selectAll("path")
    .data(Usa.features)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("fill", "steelblue")
    .attr("d", geoGenerator);

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
      });
    
    g2.append("circle")
      .attr("id", "citycircle")
      .attr("cx", projection([d.lon, d.lat])[0])
      .attr("cy", projection([d.lon, d.lat])[1])
      .attr("fill", "#ba000a")
      .style("opacity", 0.05)
    
      .attr("r",
  
       circlescale( Num_Player(data,d.team_abbreviation))
      );
  });
}
