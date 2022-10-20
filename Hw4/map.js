
var usa = d3.json("./D3_HW1_data/us-states.json");
var Team = d3.csv("./D3_HW1_data/TeamLoc.csv");


usa.then(drawUsa)

function Scatter(Usa){

  const bars = d3.select("#chart-area")
  .append("svg")
  .attr("class", "container")
  .attr("id", "bar-plot")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

}
var svg1 = d3.select("#svg1")
var g = svg1.append('g')
var width = 1000;
var height = 800;
function drawUsa(Usa) {

  
  
  var projection = d3.geoMercator()
        .fitExtent([[0,0], [width, height],],  Usa);
  
  var geoGenerator = d3.geoPath()
        .projection(projection);
        
  const g= svg1.append('g')
      g.selectAll('path')
        .data(Usa.features)
        .enter()
        .append('path')
        .attr('stroke', "white")
        .attr('fill', 'steelblue')
        .attr('d', geoGenerator)
        .attr('transform','scale(.6,.6)')
  
  Team.then(data =>{

 
    data.forEach(function(d){
        
        d.lon = Number(d.lon);
        d.lat = Number(d.lat);
        g.attr("class","citytext")
           .selectAll("text")
           .data(data)
           .enter()
           .append("text") 
           .attr("x", function(d) {
            return projection([d.lon, d.lat])[0];
        })
    .attr("y", function(d) {
      return projection([d.lon, d.lat])[1];
      })
      .attr("dy", -7)
      .style("fill", "black") // fill the text with the colour black
      .attr("text-anchor", "middle") // set anchor y justification
      .text(function(d) {return d.team_abbreviation;})
      .attr('transform','scale(.6,.6)');  
        g.append('circle')
        .attr('id',"citycircle")
        .attr('cx', projection( [ d.lon , d.lat ])[0] )
        .attr('cy', projection( [ d.lon , d.lat ])[1] )
        .attr('fill', 'red')
        .attr('r', 10)
        .attr('transform','scale(.6,.6)')
        
     
        
    });

    
   
    // svg1.append('circle')
    // .attr('cx', projection( [ dis.lon , d.lat ])[0] )
    // .attr('cy', projection( [ d.lon , d.lat ])[1] )
    // .attr('fill', 'red')
    // .attr('r', 5);
  }) 

  
  
}

