

var width = 550
var height = 550
var margin = 200

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div 
var svg = d3.select("#donut_chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create data
var data = {
USA:290000,
UK:355000,
Germany:434000,
Italy:407000,
Singapore:382000,
NewZealand:369000,
TaiWan:341000}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["USA", "UK", "Germany", "Italy", "Singapore", "NewZealand", "TaiWan"])
  .range(d3.schemeDark2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// The arc generator
var arc = d3.arc()
  .innerRadius(radius * 0.5)         // This is the size of the donut hole
  .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

svg
  .selectAll('allSlices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Add the polylines between chart and labels:
svg
  .selectAll('allPolylines')
  .data(data_ready)
  .enter()
  .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc.centroid(d) 
      var posB = outerArc.centroid(d) 
      var posC = outerArc.centroid(d); 
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
      return [posA, posB, posC]
    })

svg
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
    .text( function(d) { console.log(d.data.value) ; return d.data.key + " " + d.data.value + " cases"  } )
    .attr('transform', function(d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
svg.append("text")
    .attr("x", -100)
    .attr("y", -150)
    .text("Total Covid cases / 1 M Population");