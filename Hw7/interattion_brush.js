import { drawUsa } from "./drawmap.js";
import { drawUsa2 } from "./drawmap.js";
// import {frame_init} from './init.js'
import { draw_scatt } from "./drawscatter.js";
import { draw_histamgram } from "./drawHitogram.js";
import { top_tip } from "./interaction.js";
import { isbrushed } from "./interaction.js";
const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

export function interactoin_inone(data, usa, g) {
  var g1 = g[0];
  var g2 = g[1];
  var g3 = g[2];
  var g4 = g[3];
  var g5 = g[4];
  var g6 = g[5];
  var g7 = g[6];
  var g8 = g[7];
  drawUsa(usa, data, g2, WIDTH, HEIGHT);
  var scale = draw_scatt(data, g1);

  draw_histamgram(data, g3, "pts", FHeight, HEIGHT, 40);
  draw_histamgram(data, g4, "reb", FHeight, HEIGHT, 30);
  draw_histamgram(data, g5, "ast", FHeight, HEIGHT, 50);
  draw_histamgram(data, g6, "age", FHeight, HEIGHT, 20);
  draw_histamgram(data, g7, "gp", FHeight, HEIGHT, 30);
  draw_histamgram(data, g8, "draft_number", FHeight, HEIGHT, 30);

  var tip = top_tip();
  var circle = scale["circle"];
  var brush_parameter = [];
  var brush = d3

    .brush()
    .extent([
      [0, 0],
      [300, 300],
    ])
    .on("start", function () {
      brush_parameter = [];
      var extent = d3.event.selection;
      console.log(extent);
      circle.classed("selected", (d) => {
        var selected = isbrushed(
          extent,
          scale["xscale"](d.umapX),
          scale["yscale"](d.umapY)
        );

        if (selected == true) brush_parameter.push(d);

        console.log("okay");
      });
    })
    .on("brush", () => {
      brush_parameter = [];
      var extent = d3.event.selection;
      console.log(extent);
      circle.classed("selected", (d) => {
        var selected = isbrushed(
          extent,
          scale["xscale"](d.umapX),
          scale["yscale"](d.umapY)
        );

        if (selected == true) brush_parameter.push(d);

        console.log("okay");
      });
    })
    .on("end", () => {
      if (brush_parameter.length >= 1) {
        drawUsa2(usa, brush_parameter, g2, WIDTH, HEIGHT,'brush');
        draw_histamgram(brush_parameter, g3, "pts", FHeight, HEIGHT, 40);
        draw_histamgram(brush_parameter, g4, "reb", FHeight, HEIGHT, 30);
        draw_histamgram(brush_parameter, g5, "ast", FHeight, HEIGHT, 50);
        draw_histamgram(brush_parameter, g6, "age", FHeight, HEIGHT, 20);
        draw_histamgram(brush_parameter, g7, "gp", FHeight, HEIGHT, 30);
        draw_histamgram(
          brush_parameter,
          g8,
          "draft_number",
          FHeight,
          HEIGHT,
          30
        );
      }else{
        drawUsa2(usa, data, g2, WIDTH, HEIGHT,'brush');
        draw_histamgram(data, g3, "pts", FHeight, HEIGHT, 40);
        draw_histamgram(data, g4, "reb", FHeight, HEIGHT, 30);
        draw_histamgram(data, g5, "ast", FHeight, HEIGHT, 50);
        draw_histamgram(data, g6, "age", FHeight, HEIGHT, 20);
        draw_histamgram(data, g7, "gp", FHeight, HEIGHT, 30);
        draw_histamgram(data, g8, "draft_number", FHeight, HEIGHT, 30);
      }
    });

  //   if (brush_parameter.length>0){
  //     draw_histamgram(brush_parameter, g3, "pts", FHeight, HEIGHT, 40);
  //   }
  var circleG = scale["circleG"];
  circleG.call(brush);
}