// count the size of every team and return the value of every team lengh
function Num_Player(data, teamID) {
  var datas = d3
    .nest()
    .key(function (d) {
      return d.team_abbreviation;
    })
    .rollup(function (d) {
      return d.length;
    })
    .entries(data);
  // var team = d3.group(data, (d) => d.team_abbreviation);

  // return arrayFromRollup;
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].key ==teamID){
      return datas[i].value
    }
  }
}
export function drawUsa(Usa, data, g, WIDTH, HEIGHT) {
  //usmap
  var projection = d3.geoMercator().fitExtent(
    [
      [-305, 20],
      [WIDTH + 160, HEIGHT + 180],
    ],
    Usa
  );

  var geoGenerator = d3.geoPath().projection(projection);
  var circlescale = d3.scaleLinear().domain([0, 8]).range([0, 8]);
  var map=g.selectAll("path")
    .data(Usa.features)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("fill", "steelblue")
    .attr("d", geoGenerator);

  data.forEach(function (d) {
    d.lon = Number(d.lon);
    d.lat = Number(d.lat);
    g.attr("class", "citytext")
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

    g
    .append("circle")
      .attr("id", "citycircle")
      .attr("cx", projection([d.lon, d.lat])[0])
      .attr("cy", projection([d.lon, d.lat])[1])
      .attr("fill", "#ba000a")
      .style("opacity", 0.05)

      .attr(
        "r",

        circlescale(Num_Player(data, d.team_abbreviation))
      );
  });
}
