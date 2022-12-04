var myWords = ["Jeremy Lin", "Insane", "NBA", "Baller", "Genius", "Harvard", "infinity", "beyond", "all in", "Ball-Lin", "Nothing Is Linpossible"
              , "Lindubitably", "Linstallment", "Linternational", "Lintelligence", "dimer", "3-pt Shooter", "Giant Slasher"]


// append the svg object to the body of the page
var svg_w = d3.select("#words").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d}; }))
  .padding(2)        
  .rotate(-5)       
  .fontSize(20)      
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg_w
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", 20)
        .style("fill", "#F58426")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}