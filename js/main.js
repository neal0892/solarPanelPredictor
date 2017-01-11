/*jslint browser:true */


function avgDailyConsumption(elem){
    var yearlyWattage = document.getElementById(elem);
    var monthlyWattage = yearlyWattage.getElementsByTagName('input');
	var sum =  0 ;
for(i=0;i<monthlyWattage.length ;i++)
{	
	var j = parseInt(monthlyWattage[i].value);
	sum += j;
}
var AvgDailyRequirement = sum / 365 ; //this is daily requirement of a day in kwH 
// we need to convert it into watt-hours 
var AvgDailyRequirementWH = AvgDailyRequirement * 1000 ; 
return AvgDailyRequirementWH;
}
//we need to compensate for 25 % rough weather too

function sunshine(){
var hrs ;
 var Sunshinedaily = document.forms.solarForm.zone.selectedIndex ;
 Sunshinedaily += 1 ;
 switch(Sunshinedaily){
 	case 1 :
 		hrs = 8 ;
 		break ;
 	case 2 :
 		hrs = 7.5 ;
 		break ;
 	case 3 :
 		hrs = 7 ;
 		break ;
 	case 4 :
 		hrs = 6.5 ;
 		break ;
 	case 5 :
 		hrs = 6 ;
 		break ;
 	case 6 :
 		hrs = 5.5 ;
 		break ;
 	case 7 :
 		hrs = 5 ;
 		break ;
 	case 8 :
 		hrs = 4.5 ;
 		break ;
 	case 9 :
 		hrs = 3 ;
 	}	

 return hrs ; 	
 }
function panelInfo(){
var userChoice = document.forms.solarForm.panel.selectedIndex ;
var optios = document.forms.solarForm.panel.options ; 
var power = optios[userChoice].value ;
var name = optios[userChoice].text;
var x = [power,name];
return x ;
}

function calcNeeds(){

	var sunhoursDay = sunshine();
		console.log(sunhoursDay);
	var dailyRequirement = avgDailyConsumption('mpc');
		
	var minWneeds = dailyRequirement / sunhoursDay  ;
	var RealWneeds = minWneeds * 1.40 ; 
	var panel1 =  panelInfo();
	var panelValue = panel1[0];
	var panelName = panel1[1];
	 var PanelNeeded = Math.ceil(RealWneeds / panelValue) ; 


var feedback = ""; 
feedback += "<p>Based on your average daily usage of " + Math.round(dailyRequirement)/1000 + " KiloWatt-Hours , you'll need "+ PanelNeeded + " Panels to offset 100% electricity consumption</p>" ;
feedback += "<h2>Additional Details</h2><br>";
feedback += "<p>Your average daily electricity consumption is "+Math.round(dailyRequirement)/1000 +"</p>";
feedback += "<p>The daily Sunshine hours are :" + sunhoursDay +"</p>"
feedback += "<p>The Realistics wattage needs are " +RealWneeds+ "</p>"
feedback += "<p>The " + panelName +" you have selected generates about " + panelValue+ " Watts per hour</p>"
document.getElementById('feedback').innerHTML = feedback ; 
}
