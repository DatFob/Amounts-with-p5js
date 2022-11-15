
const width = 600;
const height = 500;
const margin = {top:50, right:40, bottom:40, left:50};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
var yIncrease = 0
var linear = d3.scaleLinear()
  .domain([75,90])
  .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

const svg3 = d3.select('#two_viz')
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
svg3.append("text")
	.text("Competing with Stars Chart")
	.attr("x", 250)
	.attr("y", 80)	


var legendLinear = d3.legendColor()
  .shapeWidth(30)
  .orient('horizontal')
  .scale(linear);


function chartStart() {
    svg3.append("text")
    .text("Points / Game")
    .attr("x", 8)
    .attr("y", 140);
  
  
  svg3.append("text")
    .text("Rebounds")
    .attr("x", 10)
    .attr("y", 140 + 100);
  
  
  svg3.append("text")
    .text("Assists")
    .attr("x", 10)
    .attr("y", 140 + 200);
  
  svg3.append("text")
    .text("Efficiency")
    .attr("x", 10)
    .attr("y", 140 + 300); 
}

const drawPlayer = data => {
  let object = data;
  let points = object.pts;
  let rebounds = object.reb;
  let efficiency = object.efficiency;
  let assist = object.ast;
  
  let colorCode = "";
  
  if(object.player == "Kevin Durant"){
    colorCode = "#007AC1";
  }else if(object.player == "Kobe Bryant"){
    colorCode = "#552583";
  }else if(object.player == "LeBron James"){
    colorCode = "#98002E";
  }else {
    colorCode = "#F58426";
  }
  console.log(object.pts);

  
  const xScale = d3.scaleLinear()
  .domain([0,50])
  .range([0, innerWidth]);

 const yScale = d3.scaleBand()
  .domain(50)
  .range([0,innerHeight])
  .padding(0.1);
	
   const yAxis = d3.axisLeft(yScale);
   const xAxis = d3.axisBottom(xScale);
  
  var g = svg3.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
  
  g.append("g")
  .attr("transform", "translate(50,410)")
  .call(d3.axisBottom(xScale));

  g.append("g")
  .attr("transform", "translate(50,0)")
  .call(d3.axisLeft(yScale).ticks(10));
  
  g.append('rect')
    .attr('x', 0)
    .attr('y', 0 + yIncrease)
    .attr('width', xScale(points))
    .attr('height', 20)
    .attr("transform", "translate(50,0)")
    .attr('stroke', 'black')
    .attr('fill', colorCode)
    .on('mouseover',function() {
        svg3.append("text")
        .attr("id","ptText")
        .text(object.player + " " + points + " points")
        .attr("x", 450)
        .attr("y", 150);

        let link = ""
        if(object.player == "Kobe Bryant"){
          link = 'https://pbs.twimg.com/media/EPO2F1CX4AEPIVk.jpg'
        }else if(object.player == 'LeBron James'){
          link = "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
        }else if(object.player == "Kevin Durant"){
          link = "https://www.gannett-cdn.com/authoring/2013/05/24/NOKL/ghnewsok-OK-3833629-17804851.jpeg?width=600&height=824&fit=crop&format=pjpg&auto=webp"
        }else{
          link = "https://www.highlandernews.org/wp-content/uploads/sports.JeremeyLin.JeremyLinviaInstagram.jpg"
        }

        svg3.append('image')
        .attr("id","ptImage")
        .attr('xlink:href', link)
        .attr('width', 300)
        .attr('height', 300)
        .attr("x", width- 200)
        .attr("y", 200);
    })
    .on('mouseout',function () {
        svg3.select("#ptText").remove();
        svg3.select("#ptImage").remove();
    });;
  
    g.append('rect')
    .attr('x', 0)
    .attr('y', 100 + yIncrease)
    .attr('width', xScale(rebounds))
    .attr('height', 20)
    .attr('stroke', 'black')
    .attr("transform", "translate(50,0)")
    .attr('fill', colorCode)
    .on('mouseover',function() {
          svg3.append("text")
          .attr("id","ptText")
          .text(object.player + " " + rebounds + " rebounds")
          .attr("x", 450)
          .attr("y", 150);
          let link = ""
          if(object.player == "Kobe Bryant"){
            link = 'https://pbs.twimg.com/media/EPO2F1CX4AEPIVk.jpg'
          }else if(object.player == 'LeBron James'){
            link = "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
          }else if(object.player == "Kevin Durant"){
            link = "https://www.gannett-cdn.com/authoring/2013/05/24/NOKL/ghnewsok-OK-3833629-17804851.jpeg?width=600&height=824&fit=crop&format=pjpg&auto=webp"
          }else{
            link = "https://www.highlandernews.org/wp-content/uploads/sports.JeremeyLin.JeremyLinviaInstagram.jpg"
          }
  
          svg3.append('image')
          .attr("id","reboundImage")
          .attr('xlink:href', link)
          .attr('width', 300)
          .attr('height', 300)
          .attr("x", width- 200)
          .attr("y", 200);

      })
      .on('mouseout',function () {
          svg3.select("#ptText").remove();
          svg3.select("#reboundImage").remove();
      });;;
  
    g.append('rect')
    .attr('x', 0)
    .attr('y', 200 + yIncrease)
    .attr('width', xScale(assist))
    .attr('height', 20)
    .attr('stroke', 'black')
    .attr("transform", "translate(50,0)")
    .attr('fill', colorCode)
  	.on('mouseover',function() {
        svg3.append("text")
        .attr("id","ptText")
        .text(object.player + " " + assist + " assists")
        .attr("x", 450)
        .attr("y", 150);

        let link = ""
        if(object.player == "Kobe Bryant"){
          link = 'https://pbs.twimg.com/media/EPO2F1CX4AEPIVk.jpg'
        }else if(object.player == 'LeBron James'){
          link = "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
        }else if(object.player == "Kevin Durant"){
          link = "https://www.gannett-cdn.com/authoring/2013/05/24/NOKL/ghnewsok-OK-3833629-17804851.jpeg?width=600&height=824&fit=crop&format=pjpg&auto=webp"
        }else{
          link = "https://www.highlandernews.org/wp-content/uploads/sports.JeremeyLin.JeremyLinviaInstagram.jpg"
        }

        svg3.append('image')
        .attr("id","assistImage")
        .attr('xlink:href', link)
        .attr('width', 300)
        .attr('height', 300)
        .attr("x", width- 200)
        .attr("y", 200);

    })
    .on('mouseout',function () {
        svg3.select("#ptText").remove();
        svg3.select("#assistImage").remove();
    });;;
  
    g.append('rect')
    .attr('x', 0)
    .attr('y', 300 + yIncrease)
    .attr('width', xScale(efficiency))
    .attr('height', 20)
    .attr('stroke', 'black')
    .attr("transform", "translate(50,0)")
    .attr('fill', colorCode)
  	.on('mouseover',function() {
        svg3.append("text")
        .attr("id","ptText")
        .text(object.player + " " + efficiency + " efficiency rating")
        .attr("x", 450)
        .attr("y", 150);

        let link = ""
        if(object.player == "Kobe Bryant"){
          link = 'https://pbs.twimg.com/media/EPO2F1CX4AEPIVk.jpg'
        }else if(object.player == 'LeBron James'){
          link = "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
        }else if(object.player == "Kevin Durant"){
          link = "https://www.gannett-cdn.com/authoring/2013/05/24/NOKL/ghnewsok-OK-3833629-17804851.jpeg?width=600&height=824&fit=crop&format=pjpg&auto=webp"
        }else{
          link = "https://www.highlandernews.org/wp-content/uploads/sports.JeremeyLin.JeremyLinviaInstagram.jpg"
        }

        svg3.append('image')
        .attr("id","effImage")
        .attr('xlink:href', link)
        .attr('width', 300)
        .attr('height', 300)
        .attr("x", width- 200)
        .attr("y", 200);

    })
    .on('mouseout',function () {
        svg3.select("#ptText").remove();
        svg3.select("#effImage").remove();
    });;;
  
  yIncrease = yIncrease + 20;
  
}


function start(){
d3.csv('stars/first.csv').then(data => {
  console.log("running")
  	for(let i =0;i<data.length;i++){
     		drawPlayer(data[i]); 
    }
  chartStart();
})
}

start();