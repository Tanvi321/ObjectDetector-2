img="";
status="";
objects=[];

function preload()
{img=loadImage('pencil case.jpg');}

function setup()
{
    canvas=createCanvas(380, 380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw()
{
    image(img, 0, 0, 380, 380);

    if(status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(img, gotResult);
        for(i=0; i<objects.length; i++)
            {
                document.getElementById("status").innerHTML="Status: Object Detected";
                document.getElementById("number_of_objects").innerHTML="There are "+objects.length+" objects detected"
                fill('#000000');
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
                noFill();
                stroke('#000000');
                rect(objects[i].x, objects[i].y,  objects[i].width,  objects[i].height);
            }
    }
    
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

console.log(results);
objects=results;
}

