 // generate random data
 const data = Array.from({ length: 100 }, () => ({
    x: Math.random() * 500,
    y: Math.random() * 500,
  }));

  // create a scatter plot
  const svg = d3.select("svg");
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 5)
    .attr("fill", "blue");

  // load CSV data
  d3.csv("titanic.csv").then((data) => {
    console.log(data);

    // compute age distribution
    const ageDistribution = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.Age
    );

    // create a pie chart
    const pieData = Array.from(ageDistribution, ([age, count]) => ({
      age,
      count,
    }));
    const pieWidth = 300;
    const pieHeight = 300;
    const pieRadius = Math.min(pieWidth, pieHeight) / 2;
    const pieSvg = d3
      .select("body")
      .append("svg")
      .attr("width", pieWidth)
      .attr("height", pieHeight);
    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);
    const arc = d3.arc().innerRadius(0).outerRadius(pieRadius);
    const color = d3.scaleOrdinal().range(d3.schemeCategory10);
    const pieChart = pieSvg
      .append("g")
      .attr("transform", `translate(${pieWidth / 2}, ${pieHeight / 2})`);
    const arcs = pieChart
      .selectAll("arc")
      .data(pie(pieData))
      .enter()
      .append("g");
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.age));
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.age);
  });