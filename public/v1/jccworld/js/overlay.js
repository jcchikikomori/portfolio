/* (C) CreativeCOW.net, under licensed to public */

function clicker(){
	var div=document.getElementById('displaybox');
	if(div.style.display == "none"){
		div.style.display = "";
		div.innerHTML = '<div style="box-shadow: 0.0em 0.3em 0.1em #000; border-color:#000000; margin: 0 auto; margin-top:15%; height:210px; width:570px; padding:30px; background-color:#0000A0;"><iframe src="welcome.html" style="height:200px; width:600px; border:none; overflow:hidden;"></iframe><a href="#" onclick="return clicker();" style="font-size:18px; color:#FFFFFF;">Okay</a></div>';
	}else{
		div.style.display = "none";
		div.innerHTML = '';
	}
	return false;
}