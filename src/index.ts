import * as d3 from "d3";

const target = document.getElementById("app");
const width = 300;
const height = 300;

const data = [2, 4, 8, 10];

const svg = d3
  .select(target)
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const radius = Math.min(width, height) / 2;
const label = d3
  .arc()
  .outerRadius(radius)
  .innerRadius(radius - 80);
const g = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const color = d3.scaleOrdinal([
  "#548CEC",
  "#DB4E79",
  "#BD3947",
  "#f49c30",
  "#5678bf",
]);

// Generate the pie
var pie = d3.pie();

// Generate the arcs
var arc: any = d3.arc().innerRadius(0).outerRadius(radius);

//Generate groups
var arcs = g
  .selectAll("arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc");

//Draw arc paths
arcs
  .append("path")
  .attr("fill", function (d, i: any) {
    return color(i);
  })
  .attr("d", arc)
  .append("text")
  .attr("transform", function (d: any) {
    return "translate(" + label.centroid(d) + ")";
  })

  .text(function (d) {
    return "Hello";
  });
