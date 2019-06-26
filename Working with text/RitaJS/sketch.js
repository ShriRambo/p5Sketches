var input;
var button;

var lexicon;

function setup() {
    noCanvas();
    input = createInput("Shine on you, crazy diamond.");
    button = createButton('Submit');
    button.mousePressed(ProcessRita);
    input.changed(ProcessRita);
    input.size(300);

    //lexicon= new RiTA();
  
}

function ProcessRita(){
    var s =  input.value();
    //createP(s);
    var rs = new RiString(s);
    var word = rs.words();
    var pos = rs.pos();
    console.log(word);
    console.log(pos);
    var newS = ""
    for (var i = 0; i< word.length; i++){
        if(/nn.*/.test(pos[i])){
            newS += random(RiTa.similarBySound(pos[i]));
        }else{
            newS += word[i]
        }
        newS += " "
    }

    createP(newS);
}


"Hey Jude, don't make it bad Take a sad song and make it better Remember to let her into your heart Then you can start to make it better Hey Jude, don't be afraid You were made to go out and get her The minute you let her under your skin Then you begin to make it better And anytime you feel the pain, hey Jude, refrain Don't carry the world upon your shoulders For well you know that it's a fool who plays it cool By making his world a little colder Nah nah nah nah nah nah nah nah nah Hey Jude, don't let me down You have found her, now go and get her Remember to let her into your heart Then you can start to make it better  So let it out and let it in, hey Jude, begin You're waiting for someone to perform with And don't you know that it's just you, hey Jude, you'll do The movement you need is on your shoulder Nah nah nah nah nah nah nah nah nah yeah Hey Jude, don't make it bad Take a sad song and make it better Remember to let her under your skin Then you'll begin to make it Better better better better better better, oh Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude Nah nah nah nah nah nah, nah nah nah, hey Jude" 