function draw_histamgram(data,g){
    g.append("text")
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
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("umapY");
  const yAxisCall = d3.axisLeft(y);
  const xAxisCall = d3.axisBottom(x);
  g.append("g").call(yAxisCall)
  g.append("g")
  .call(xAxisCall).attr("transform", "translate(0,"+HEIGHT+")")
}