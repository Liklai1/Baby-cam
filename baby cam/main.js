var img;
var status="";
var objects=[];
var song1="";
function preload(){
 song1=loadSound("Alarm sound effect.mp3");
}
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}
function draw(){
    image(video, 0 , 0 ,380, 380);
    if(status!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video, gotResult);
   for(i=0; i<objects.length; i++){
    document.getElementById("status").innerHTML="status : object detected"; 
    if(object[i].label="person"){
        document.getElementById("baby_status").innerHTML="baby detected";
        song1.stop();
    }
    else(object[i].label=!"person");{
        document.getElementById("baby_status").innerHTML="baby not detected";
        song1.play();
    }
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+ percent+"%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke(r, g, b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
   }
if(objects.length<0){
    document.getElementById("baby_status").innerHTML="baby detected";
    song1.play();
}
}
}
function modelLoaded(){
    status=true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}