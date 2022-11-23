var width = 650
var height = 650
var margin = 20

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div 
var svg1 = d3.select("#bars")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")

svg1.append("text")
    .attr("x",width/2 - 50)
    .attr("y", 30)
    .text("Covid Cases");

const render = data => {
  const xValue = d => d.covid;
  const yValue = d=>d.country;
  const margin = {top:50,right:20,left:100,bottom:20};
  const innerWidth = width - margin.left - margin.right
  const innerHeight  = height - margin.top - margin.bottom
  const xScale = d3.scaleLinear()
    .domain([280000,d3.max(data,xValue)])
    .range([0,innerWidth]);
  
  const yScale =d3.scaleBand()
  	.domain(data.map(yValue))
  	.range([0,innerHeight])
  	.padding(0.1);
  const yAxis = d3.axisLeft(yScale);
  
  const g = svg1.append('g')
  	.attr('transform',`translate(${margin.left},${margin.top})`)
  
  yAxis(g.append('g'));
  
  g.append('g').call(d3.axisBottom(xScale))
  	.attr('transform',`translate(0,${innerHeight})`);
  
  g.selectAll('rect').data(data)
  .enter().append('rect')
  	.attr('y',d => yScale(yValue(d)))
    .attr('width',d => xScale(xValue(d)))
    .attr('height',yScale.bandwidth())
};

d3.csv('data.csv', function(data){
  data.forEach( d => {
    d.covid  = +d.covid;
  });
  render(data);
});

