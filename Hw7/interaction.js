export function isbrushed(coords, cx, cy) {
  var x0 = coords[0][0],
    x1 = coords[1][0],
    y0 = coords[0][1],
    y1 = coords[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}
export function isbrushedX(coords, cx, cy) {
  var x0 = coords[0],
    x1= coords[1];
  return cx >= x0 && cy <=x1;
}

function endbrushed() {
  // bars
  //   .data(genders)
  //   .attr("x", 10)
  //   .attr("y", (d, i) => i * 20)
  //   .attr("width", (d) => d / 2)
  //   .attr("height", 15);
}

export function selectbar(rect) {
  var colors = ["blue"];
  rect
    .on("mouseover", function (d, i) {
      d3.select(this).style("fill", colors[i]);
    })
    .on("mouseleave", function () {
      d3.select(this).style("fill", "#69b3a2");
    });
}
export function top_tip() {
  var tool = pointer_tool();
  return tool;
}

function pointer_tool() {
  // return the string
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(
      (d) =>
        // d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm
        "Name :" +
        d.player_name +
        "<br> pts: " +
        d.ptsNorm +
        "<br> reb" +
        d.rebNorm +
        "<br> ast" +
        d.astNorm
    );

  return tip;

  //
}
export function brush_scatter(g) {
  var circle = g;

  // genders = [0, 0];
  var selectV = [];
  var brush = d3
    .brush()
    .extent([
      [0, 0],
      [300, 300],
    ])
    .on("start brush", function () {
      var extent = d3.event.selection;
      console.log(extent);

      circle.classed("selected", (d) => {
        var selected = isbrushed(extent, xscale(d.umapX), yscale(d.umapY));
        if (selected == true) console.log("okay");
      });
    })

    .on("end", endbrushed);
  return brush;
  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area)
}
// function brushX(para) {
//   var brushX = d3
//     .brushX()
//     .extent([
//       [0, 100],
//       [300, 300],
//     ])
//     .on("brush", () => {
//       var extent = d3.event.selection;
//       console.log(extent);
//       //     circle.
//     });
// }
function duplicate(para){
    var notduplicate = []
    para.forEach(function (d,i) {
      d[i]
    })
}