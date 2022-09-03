let data;
function preload() {
    data = loadTable("ATI.csv", "csv", "header");
}

function setup() {
    createCanvas(800, 1000);
    noLoop();
}
  
function draw() {
    background(220);
    fill(0);
    if(data){
        line(50,300,50, 50);
        text("Income in 1000 $", 20, 40);
        line(50,300,900,300);
        text("Job Title", 0,350);
        let income = data.getColumn("Average Taxable Income $");
        let jobName = data.getColumn("Occupation");
        let gender = data.getColumn("Gender");
        let newIncome = [];
        text("Average Taxable Income in Thousand Dollars", 300, 50);
        let angle = radians(270);
        for (let i = 0; i< 15; i++){
            let job = getJobName(gender[i],jobName[i]);
            push();
            translate(50*i + 70, 420);
            rotate(angle);
            text(job, 0,0);
            pop();
            let incomeTemp = parseInt(income[i].replace(/,/g,''));
            newIncome[i] = incomeTemp;
            let x = i*50 + 60;
            let y = 300 - incomeTemp/1000 ;
            let w = 20;
            let h = incomeTemp/1000;
            rect(x,y,w,h);
            text(Math.floor(incomeTemp/1000),x,y - 10);
        }
        maxValue = Math.max.apply(Math,newIncome);
        console.log(maxValue);
        for (let k = 0;  k < maxValue/1000;k=k+50){
            text(k,10,300 - k);
        }
    }
}

function getJobName(gender, job) {
    const jobNameArray = job.split(" ");
    let result = gender.concat("-");
    result = result.concat(jobNameArray[0]);
    return result;
}