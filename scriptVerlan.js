//scriptVerlan.js

const SEPARATOR = "@";
const VOYELLE = ['a' ,'e', 'i', 'o', 'u', 'y'];
const CONSONNE = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l' , 'm' , 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];

//RULES GO THERE!
const DIGRAMME = [  ['n','s'],
					['n', 't'],
					['o', 'b'],
					['r', 'b'],
					['s', 's'],
					['r', 'c'],
					]


function isDoubleConsonne(c1, c2){
	if(c1===c2 && CONSONNE.indexOf(c1)!=-1)
		return true;
	return false
}

function isDigrammeSeparation(c1, c2){
	var tmp = DIGRAMME.filter(item=>{
		return (item[0]===c1 && item[1]===c2);
	});			
	return tmp.length>0;
	
}

//predicat->iterable => iterable
function transform2(predicat, iterable){
	res = iterable.slice(0);//shallow copying
	for(var i=0;i<iterable.length-1;i++){
		if(predicat(res[i],res[i+1])){
			res.splice(i+1,0, SEPARATOR);
		}
	}
	return res;
}


function sendText(text){
	VoiceRSS.speech({
            key: '6344602d3d0c41f990ef3f732e4383de',
            src: text,
            hl: 'fr-fr',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

function textToVerlan(text){
	var tmp = this.transform2(this.isDigrammeSeparation, text.split(''));
	var indexBalise = tmp.indexOf('@');
	var res = text.split('').splice('');
	var j=0;
	for(var i=indexBalise+1;i<tmp.length;i++){
		res[j++] = tmp[i];
	}
	for(var i=0;i<indexBalise;i++){
		res[j++] = tmp[i];
	}
	return res.join('');
}


 function ttt(){
	// alert("click");
	var valInput = document.getElementById("input").value;
	var verlan = textToVerlan(valInput);
	
	document.getElementById("span").innerHTML = verlan;
	sendText(verlan);
}