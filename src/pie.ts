import * as d3 from "d3";

interface ChartProps {}

interface DataProps {
  label: string;
  value: number;
  color?: string;
  sliced?: boolean;
}
interface LabelProps {
  enabled?: boolean;
  format?: string;
  type: "arc|line|point";
}
interface InnerProps {
  enabled?: boolean;
  radius?: number;
  text: string;
  className?: string;
}
interface PieChartProps {
  title?: string;
  width?: number;
  height?: number;
  label?: LabelProps;
  chart?: ChartProps;
  data: DataProps[];
  inner?: InnerProps;
}

const Pie = (container: HTMLElement, options: PieChartProps) => {
  const defaultOptions = {
    width: 300,
    height: 300,
    label: {
      enabled: false,
    },
    inner: {
      enabled: false,
      radius: 60,
      text:""
    },
    data: [],
  };

  const config = { ...defaultOptions, ...options };

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", config.width)
    .attr("height", config.height);

  const radius = Math.min(config.width, config.height) / 2;


  const g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + config.width / 2 + "," + config.height / 2 + ")"
    );

  const color = d3.scaleOrdinal([
    "#f8b323",
    "#656a59",
    "#46b2b5",
    "#8caa7e",
    "#d36f68",
    "#826276",
  ]);

  const data: any = config.data;
  // Generate the pie
  var pie = d3
    .pie()
    .sort(null)
    .value((data: any) => data.value);

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
    .attr("fill", function (d: any, i: any) {
      if (d.data && d.data.color) {
        return d.data.color;
      } else {
        return color(i);
      }
    })
    .attr("d", arc);

  if (config.inner.enabled) {
    const innerCircle = g.append("g").attr("class", "inner-circle");

    innerCircle.append("circle").attr("r", config.inner.radius);

    innerCircle
      .append("text")
      .text(config.inner.text)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#fff");
  }
  if (config.title && config.title.length > 0) {
    svg
      .append("g")
      .attr("transform", "translate(" + config.width / 2 + ",20)")
      .append("text")
      .text(config.title)
      .attr("text-anchor", "middle")

      .attr("class", "title");
    svg.attr("height", config.height + 60);
    g.attr(
      "transform",
      "translate(" + config.width / 2 + "," + (config.height / 2 + 45) + ")"
    );
  }
};

export default Pie;
