import { drawUsa } from "./drawmap.js";
import { drawUsa2 } from "./drawmap.js";
// import {frame_init} from './init.js'
import { draw_scatt } from "./drawscatter.js";
import { draw_scatt1 } from "./drawscatter.js";
import { draw_histamgram } from "./drawHitogram.js";
import { top_tip } from "./interaction.js";
import { isbrushed } from "./interaction.js";
import { isbrushedX } from "./interaction.js";
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
  var mapelement = drawUsa(usa, data, g2, WIDTH, HEIGHT, 1);
  var scale = draw_scatt(data, g1);

  var scales_hispts = draw_histamgram(data, g3, "pts", FHeight, HEIGHT, 40);
  var scales_hisreb = draw_histamgram(data, g4, "reb", FHeight, HEIGHT, 30);
  var scales_hisast = draw_histamgram(data, g5, "ast", FHeight, HEIGHT, 50);
  var scales_hisage = draw_histamgram(data, g6, "age", FHeight, HEIGHT, 20);
  var scales_hisgp = draw_histamgram(data, g7, "gp", FHeight, HEIGHT, 30);
  var scales_hisdraft_numbe = draw_histamgram(
    data,
    g8,
    "draft_number",
    FHeight,
    HEIGHT,
    30
  );

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
        draw_histamgram(brush_parameter, g3, "pts", FHeight, HEIGHT, 40,1);
        draw_histamgram(brush_parameter, g4, "reb", FHeight, HEIGHT, 30,1);
        draw_histamgram(brush_parameter, g5, "ast", FHeight, HEIGHT, 50,1);
        draw_histamgram(brush_parameter, g6, "age", FHeight, HEIGHT, 20,1);
        draw_histamgram(brush_parameter, g7, "gp", FHeight, HEIGHT, 30,1);
        draw_histamgram(
          brush_parameter,
          g8,
          "draft_number",
          FHeight,
          HEIGHT,
          30
        );
        // drawUsa(usa, brush_parameter, g2, WIDTH, HEIGHT, 0);

        drawUsa2(usa, brush_parameter, g2, WIDTH, HEIGHT, 1);
      } else {
        // drawUsa2(usa, data, g2, WIDTH, HEIGHT,'brush');
        draw_histamgram(data, g3, "pts", FHeight, HEIGHT, 40);
        draw_histamgram(data, g4, "reb", FHeight, HEIGHT, 30);
        draw_histamgram(data, g5, "ast", FHeight, HEIGHT, 50);
        draw_histamgram(data, g6, "age", FHeight, HEIGHT, 20);
        draw_histamgram(data, g7, "gp", FHeight, HEIGHT, 30);
        draw_histamgram(data, g8, "draft_number", FHeight, HEIGHT, 30);
      }
    });
  
  var circleG = scale["circleG"];
  circleG.call(brush);

  var hitpts = scales_hispts["g"].append('g');
  var hitreb = scales_hisreb["g"].append('g');
  var hitast = scales_hisast["g"].append('g');
  var hitage = scales_hisage["g"].append('g');
  var hitgp = scales_hisgp["g"].append('g');
  var hitdraft_numbe = scales_hisdraft_numbe["g"].append('g');
  var circhis = scales_hispts["rect"].append('g');
  var brushX_parameter = [];
  var brushX = d3

    .brushX()
    .extent([
      [0, 100],
      [300, 300],
    ])
    
    .on("brush", () => {
      brushX_parameter = [];
      var extent = d3.event.selection;
      console.log(extent);
      circhis.classed("selected", (d) => {
        var selected = isbrushedX(
          extent,
          scales_hispts["xscale"](d.x0),
          scales_hispts["xscale"](d.x1)
        );

        if (selected == true) {
          scales_hispts["xscale"](d.x0);
          scales_hispts["xscale"](d.x1);
          brushX_parameter.push(d);
          console.log("okay");
        }
      });
    })
    .on("end", () => {
      g1.selectAll(".NormScatter").remove();
      brushX_parameter.forEach((d)=>{
        draw_scatt1(d,g1)
      })
    });

  hitpts.call(
    brushX // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  );
  hitreb.call(
    brushX // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  );
  hitast.call(
    brushX // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  );
  hitage.call(
    brushX // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  );
  hitgp.call(
    brushX // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  );
  hitdraft_numbe.call(
    brushX // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  );
}
