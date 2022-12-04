var knicksOrange = d3.color("#F58426");
var knicksBlue = d3.color("#006BB6");

var data1 = [
   {day: 2006, value: 70.51},
   {day: 2007, value: 70.51},
   {day: 2008, value: 70.51},
   {day: 2009, value: 68.04},
   {day: 2010, value: 88.66},
   {day: 2011, value: 117.47},
   {day: 2012, value: 123.22},
   {day: 2013, value: 129.38},
   {day: 2014, value: 129.38},
   {day: 2015, value: 129.38},
];


var data2 = [
   {day: 1, value: 57},
   {day: 5, value: 58},
   {day: 10, value: 58},
   {day: 15, value: 58},
   {day: 20, value: 70},
   {day: 25, value: 78},
   {day: 30, value: 83},
   {day: 35, value: 84}
];


var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right + 40)
    .attr("height", height + margin.top + margin.bottom + 300)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + 250+ ")");


var parseTime = d3.timeParse("%Y");

var dates = [];
for (let obj of data1) {
  dates.push(parseTime(obj.day));
}
var domain = d3.extent(dates);

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis")

var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","myYaxis")

var square = svg.append("rect")
    .attr("height", 20)
    .attr("width", 20)
    .attr("x", width - 130)
    .attr("y", 33)
    .attr("fill", knicksBlue)
    .on("click", function(){
    	update(data1);
    });

var square = svg.append("rect")
    .attr("height", 20)
    .attr("width", 20)
    .attr("x", width - 130)
    .attr("y", 93)
    .attr("fill", knicksOrange)
    .on("click", function(){
    	update(data2);
    });
  
svg.append("text")
  .text("Ticket Price")
  .attr("x", width - 100)
  .attr("y",50);

svg.append("text")
  .text("Klout Score")
  .attr("x", width - 100)
  .attr("y",110);



// Create a function that takes a dataset as input and update the plot:
function update(data) {
  
    // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest")
    .data([data], function(d){ return d.day });
  
  // Create the X axis:
  if(data == data1){
    ticketPriceSetup();
  // create the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value  }) ]);
  svg.selectAll(".myYaxis")
    .transition()
    .duration(3000)
    .call(yAxis)
    .style('fill', 'darkBlue');
    
    //initialize a time x axis:
    var xScale = d3.scaleTime().domain(domain).range([0, width]);
    var xYearAxis = d3.axisBottom().scale(xScale);

    svg.selectAll(".myXaxis")
    .transition()
  	.duration(3000)
    .call(xYearAxis)
    .style('fill', 'darkBlue');
    
      svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(130))
      .selectAll("stop")
      .data([
          {offset: "0%", color: "blue"},
          {offset: "100%", color: "orange"}
      ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });
    
  	u.enter()
    .append("path")
    .attr("class","lineTest")
    .attr("fill", "none")
    .attr("stroke", "red" )
    .attr("stroke-width", 3)
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
      .x(function(d) { return xScale(parseTime(d.day)); })
      .y(function(d) { return y(d.value); }))
  }else{
    kloudScoreSetup();
    // Initialise a X axis:
    var x = d3.scaleLinear().range([0,width]);
    var xAxis = d3.axisBottom().scale(x);
    svg.append("g")
      .style("font", "32px times")
      .attr("transform", "translate(0," + height + ")")
      .attr("class","myXaxis")
    x.domain([0, d3.max(data, function(d) { return d.day }) ]);
    
      // create the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value  }) ]);
  svg.selectAll(".myYaxis")
    .transition()
    .duration(3000)
    .call(yAxis)
	.style('fill', 'darkOrange');
    
  	svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis)
    .style('fill', 'darkOrange');
    
      svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(130))
      .selectAll("stop")
      .data([
          {offset: "0%", color: "blue"},
          {offset: "100%", color: "orange"}
      ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });
    
    u.enter()
    .append("path")
    .attr("class","lineTest")
    .attr("fill", "none")
    .attr("stroke", "url(#line-gradient)" )
    .attr("stroke-width", 5)
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
      .x(function(d) { return x(d.day); })
      .y(function(d) { return y(d.value); }))
  }

}

function ticketPriceSetup(){
  d3.selectAll("#klout").remove();
  
  svg.append("text")
  .text("Ticket $ vs Year")
  .attr("id","ticket")
  .attr("x", width/2)
  .attr("y", 0)
  .style("font-size", "26px")
  .style('fill', knicksBlue);

  svg.append("text")
	.text("Average Ticket Price $")
	.attr("x", 0)
	.attr("y", 50)
  .attr("id","ticket")
  .attr("transform", "rotate(90)")
  .style('fill', 'darkBlue');
  
  svg.append("text")
  .text("Year")
  .attr("id","ticket")
  .attr("x", width + 10)
  .attr("y",height)
  .style('fill', 'darkBlue');
  
}

function kloudScoreSetup(){
  d3.selectAll("#ticket").remove();
  
 	svg.append("text")
	.text("Klout Score")
  .attr("id","klout")
	.attr("x", 0)
	.attr("y", 50)
  .attr("transform", "rotate(90)")
  .style('fill', 'darkOrange');
  
  svg.append("text")
  .text("Days")
  .attr("id","klout")
  .attr("x", width + 10)
  .attr("y",height)
  .style('fill', 'darkOrange');
  
  svg.append("text")
  .text("LinSanity Klout Score")
  .attr("id","klout")
  .attr("x", width/2 - 50)
  .attr("y", 0)
  .style("font-size", "26px")
  .style('fill', knicksOrange);
}

update(data1)
