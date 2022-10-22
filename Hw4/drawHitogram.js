export function draw_histamgram(data, g, source, WIDTH, HEIGHT,tickv) {
  //add text
  g.append("text")
    .attr("x", 200)
    .attr("y", 10)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text(source);

  //ycale

  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.draft_number), 40])
    .range([HEIGHT, 0]);
  //xsclae
  const xscale = d3
    .scaleLinear()
    // .domain([0, 30])
    .domain([d3.min(data, (d) => d[source]), d3.max(data, (d) => d[source])])
    .range([0, HEIGHT]);
  //   var maxvalue = data[source];
  //   histogram scale

  var histogram = d3
    .histogram()
    .value(function (d) {
      return d[source];
    }) // I need to give the vector of value
    .domain(xscale.domain()) // then the domain of the graphic
    .thresholds(xscale.ticks(tickv)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);
  //   Y label

//   g.append("text")
//     .attr("x", -(HEIGHT / 2))
//     .attr("y", -20)
//     .attr("font-size", "10px")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .text("umapY");
  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);

  g.append("g").call(yAxisCall);

  g.append("g")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  g.selectAll("rect")
  .data(bins)
  .enter()
  .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + xscale(d.x0) + "," + yscale(d.length) + ")"; })
    .attr("width", function(d) { return xscale(d.x1) - xscale(d.x0) -1 ; })
    .attr("height", function(d) { return HEIGHT - yscale(d.length); })
    .style("fill", "#69b3a2")
}
