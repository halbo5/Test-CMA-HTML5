var point="";

function affichePoints(mot,point) {
	if (point=="")
	  {
	  point=4;
	  }
	else {
	  point--;
	}
	if (point==0) {point=4;}
	console.log("point :"+point);
	var numero;
	numero=$(mot).attr("id").substr(3,2);
	$("#point"+numero).html(point);//affiche les points pour le mot
	reste=point-1;//nombre de points restant à affecter
	if (reste==0) {reste=4;}//on remet les 4 points ce qui permet de changer d'avis
	$("span[id*='affecter']").html(" "+reste+" ");//affiche les points pour le prochain mot
	if (reste==1) {$("span[id*='pluriel']").html("");} //gestion du pluriel, on enlève le s à 1 point restant
	if (reste==4) {$("span[id*='pluriel']").html("s");} // gestion du pluriel, on remet le s
	return point;
}

function calculeScores() {
	ec=Number($("#point5").html())+Number($("#point9").html())+Number($("#point13").html())+Number($("#point17").html())+Number($("#point25").html())+Number($("#point29").html());
	or=Number($("#point2").html())+Number($("#point10").html())+Number($("#point22").html())+Number($("#point26").html())+Number($("#point30").html())+Number($("#point34").html());
	ca=Number($("#point7").html())+Number($("#point11").html())+Number($("#point15").html())+Number($("#point19").html())+Number($("#point31").html())+Number($("#point35").html());
	ea=Number($("#point4").html())+Number($("#point12").html())+Number($("#point24").html())+Number($("#point28").html())+Number($("#point32").html())+Number($("#point36").html());
	ca_moins_ec=ca-ec;
	ea_moins_or=ea-or;
	console.log("ca_moins_ec : "+ca_moins_ec);//ajoute cette différence dans la console javascript
	console.log("ea_moins_or : "+ea_moins_or);
	var profil="";
	if (ca_moins_ec>=3 && ea_moins_or>=3) {profil="Convergent";}
	if (ca_moins_ec>=3 && ea_moins_or<=2) {profil="Assimilateur";}
	if (ca_moins_ec<=3 && ea_moins_or<=2) {profil="Divergent";}
	if (ca_moins_ec<=3 && ea_moins_or>=3) {profil="Accomodateur";}
	console.log("profil : "+profil);
	if (profil=="") {profil="Impossible à déterminer";}
	$("#score_ec").html(ec);
	$("#score_or").html(or);	
	$("#score_ca").html(ca);
	$("#score_ea").html(ea);
	$("#profil").html(profil);
}

function afficheProfil() {
	//affiche la page avec la description de son profil
	profil=$("#profil").html();
	location.href="./index.html#"+profil;
}


$( document ).ready( function() {
	 
	  $("div.mot").click(function(event) {
		 point=affichePoints(this,point);
	  });
	  
	  $("#btn_calculer").click(function(event) {
		 result=calculeScores(); 
	  });
	  
	  $("#btn_profil").click(function(event) {
		  result=afficheProfil();
	  });
	  
	  //Google Analytics
	  $.ga.load("UA-135702-3");
	  
	  //bouton j'aime facebook
	  $('#fbjlike').fbjlike({
			//appID: 'xxxxxxxxxxxxxxx',
			//userID: '000000000000000',
			siteTitle: "Ma manière d'apprendre : test CMA",
			siteName: 'bolli.fr',
			//siteImage: 'An individual image',
			buttonWidth: 300,
			buttonHeight: 60,
			showfaces: true,
			send:false,
			comments:true,
			numPosts:10,
			font: 'lucida grande',
			layout: 'button_count',	//box_count|button_count|standard
			action: 'like',		//recommend|like
			colorscheme: 'light',
			lang: 'fr_FR',
			hideafterlike:false,
			googleanalytics:false,	//true|false
			//googleanalytics_obj: 'pageTracker',	//pageTracker|_gaq
			onlike: function(response){$('.fbjlike-content').show('fade');$.cookie('liked','liked');},
			onunlike: function(response){$('.fbjlike-content:visible').hide('fade');$.cookie('liked','unliked');}
	  });
	  
	  //bouton google+1
	  $('#gplusone').gplusone({
			mode: 'insert',				//insert|append  
			size: 'medium',			//small|medium|standard|tall
			count: true,				//true|false
			href: false,				//false|url
			lang: 'fr-FR',				//en-US|en-GB|de|es|fr|...
			hideafterlike:false,		//true|false
			onlike: "$.cookie('gliked','liked',{expires: 999});",
			onunlike: "$.cookie('gliked','unliked',{expires: 999});"
		});
	  
	  //bouton twitter
	  $('#twitterbutton').twitterbutton({
		  	user: 'alainbolli',
			user_description: 'Passionné par le numérique qui se partage ...',
			url: 'http://www.bolli.fr/cma',
			//count_url: 'http://www.a-differing-url-from-the-tweeted-one.com',
			title: "Décrire ma manière d'apprendre avec un test CMA",
			mode: 'insert',
			layout: 'horizontal', //vertical|horizontal|none
			action: 'tweet',		//tweet|follow
			lang: 'fr',					//en|de|ja|fr|es
			hideafterlike:false,
			googleanalytics:false,							//true|false
			//googleanalytics_obj: 'pageTracker',	//pageTracker|_gaq
			ontweet: function(response){$.cookie('tw','tweeted',{expires: 999});},
			onretweet: function(response){$.cookie('tw','retweeted',{expires: 999});},
			onfollow: function(response){$.cookie('tw','followed',{expires: 999});}

		});
	  
	});