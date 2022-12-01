var w = 960, h = 500;
    
var radius = 25;
var color = d3.scaleOrdinal(d3.schemeCategory10);
var centerScale = d3.scalePoint().padding(1).range([0, w]);
var forceStrength = 0.05;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


var salaryScale = d3.scaleLinear()
  .domain([0, 27849149]) 
  .range([0, 60])

var svg2 = d3.select("#bubbles").append("svg")
      .attr("width", w)
      .attr("height", h)

var simulation = d3.forceSimulation()
        .force("collide",d3.forceCollide( function(d){
            return d.r + 8 }).iterations(16) 
        )
        .force("charge", d3.forceManyBody())
        .force("y", d3.forceY().y(h / 2))
        .force("x", d3.forceX().x(w / 2))


var count = 0
var colorCount = 0

function start(){
d3.csv("bubbles/data.csv",  function(d) {
    d.Salary = +d.Salary;
    d.ID = count;
    count ++;
    return d;
}).then(function(data) {
    data.forEach(function(d){
        d.r = salaryScale(d.Salary);
        d.x = w / 2;
        d.y = h / 2;
      })
      
      console.table(data); 
           
      
      
      var circles = svg2.selectAll("circle")
      	.data(data);
      
      var circlesEnter = circles.enter().append("circle")
      	.attr("r", function(d, i){ return d.r; })
        .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
				.attr("cy", function(d, i){ return 250; })
      	.style("fill", function(d, i){ return color(d.ID); })
      	.style("stroke", function(d, i){ return color(d.ID); })
      	.style("stroke-width", 10)
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      	.on('mouseover',function(d, i) {
        		svg2.append("text")
          	.attr("id", "moneyText")
            .attr("x", 550)
            .attr("y", 50)
            .text("$" + d.Salary)
            .style("font-size", "26px");
        
   			})
    		.on('mouseout',function () {
        		d3.select("#moneyText").remove();
   			 });

  for(let i = 0; i < 9;i++){
    let rotate = 50 + colorCount * 40
    svg2.append("path")
    .attr("transform", "translate(100,"+rotate+")")
    .attr("d", d3.arc()
      .innerRadius( 10 )
      .outerRadius( 15 )
      .startAngle( 3.14 )     
      .endAngle( 6.28 )       
      )
    .attr('stroke', 'black')
    .attr('fill', color(colorCount) );
    
    svg2.append("text")
    .attr("x", 110)
    .attr("y", 60 + colorCount * 40)
    .text(function(d) { return data[i].playerName; })
    .style("font-size", "26px")
      .attr('fill', color(data[i].ID))
      .style('fill', color(data[i].ID));
  	colorCount += 1;
    
    
  }
    
      circles = circles.merge(circlesEnter)
      
      function ticked() {
        circles
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
      }   

      simulation
            .nodes(data)
            .on("tick", ticked);

            function dragstarted(d) {
              if (!d3.event.active) simulation.alphaTarget(.03).restart();
              d.fx = d.x;
              d.fy = d.y;
            
            }
            function dragged(d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            }
            function dragended(d) {
              if (!d3.event.active) simulation.alphaTarget(.03);
              d.fx = null;
              d.fy = null;
            }
      
    })}

start();