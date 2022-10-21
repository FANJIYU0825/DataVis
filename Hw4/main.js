

d3.csv("data/NBA.csv", d3.autoType).then(function (data) {
  d3.json("https://gist.githubusercontent.com/FANJIYU0825/11c93f8bf083adf57ed4332f1884ef9e/raw/d583353cde40462ccb799352d64ba440dca44ab7/us-states.json")
    .then(function (usa) {
      g3= frame_init("area1")
      g4= frame_init("area2")
      g5= frame_init("area3")
      g6= frame_init("area4")
      g7= frame_init("area5")
      g8= frame_init("area6")
      

      drawUsa(usa, data);
      draw_scatt(data, g1);
      draw_histamgram(data, g3);
      draw_histamgram(data, g4);
      draw_histamgram(data, g5);
      draw_histamgram(data, g6);
      draw_histamgram(data, g7);
      draw_histamgram(data, g8);
    })
    .then(function () {})
    .then(function () {});
});

function draw_scatter() {}

/*

*/
