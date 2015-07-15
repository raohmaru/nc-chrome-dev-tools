Reveal.addEventListener( 'ready', function() {  "use strict";

// Sources panel
$('#liveedit-btn').click(function(){
	var r = randomInt(64, 200),
		g = randomInt(64, 200),
		b = randomInt(64, 200);
	$(this).css('background-color', 'rgb('+r+','+g+','+b+')');
	// $('.reveal').css('background-color', 'rgb('+r+','+g+','+b+')');
});


// Breakpoints
$('#bp-form').submit(function(){
	debugger; 

	var val = $('#bp-input').val();
	if(/^\s*$/.test(val)) {
		return false;
	}
	
	$.ajax({
		url: 'http://api.mtgdb.info/search/' + val,
		data: {
			start: 0,
			limit: 10
		}
	})
	.done(function(data) {
		console.log(data);
		
		var len = data.length,
			result;
		if(len) {
			result = data.map(function(obj){
				return obj.name;
			})
		} else {
			result = ['No results found'];
		}
		
		$('#bp-output').text(result.join(', '));
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		$('#bp-output').text('Request countered. Error: ' + textStatus);
	});
	
	return false;
})


// DOM Breakpoints
function dombpAddChild(e) {	
	var $input = $('<input type="button" value="Remove" class="btn dombp-removechild" />');		
	$(this).after($input);
	$input
		.hide()
		.slideDown(200);
}

function dombpRemoveChild(e) {
	$(this).slideUp(200, function(){
		$(this).remove();
	});
}

function dombpChangeAttr(e){
	$('.dombp-wrapper').toggleClass('highligth');
}

function dombpRemove(e){
	$('.dombp-wrapper').remove();
}

$('.dombp-wrapper')
	.on('click', '.dombp-addchild',    dombpAddChild)
	.on('click', '.dombp-removechild', dombpRemoveChild)
	.on('click', '.dombp-attrmod',     dombpChangeAttr)
	.on('click', '.dombp-nodedel',     dombpRemove);


// Breakpoints on JavaScript Event Listeners
var swquotes = [
	'It\'s a trap!',
	'Use the Force, Luke',
	'I find your lack of faith disturbing',
	'May the Force be with you',
	'Do. Or do not. There is no try',
	'Join me, and together we can rule the galaxy',
	'These aren’t the droids you’re looking for',
	'Fear is the path to the dark side',
	'Luke, I am a button'
],
	quote = -1;
function evbpClick() {
/* 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . _________
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ./ It’s a trap! \
. . . . . . . . . . . . . . . . _,,,--~~~~~~~~--,_ . . . .\ ._________/
. . . . . . . . . . . . . . ,-´ : : : :::: :::: :: : : : : :º ´-, . . \/. . . . . . . . . .
. . . . . . . . . . . . .,-´ :: : : :::: :::: :::: :::: : : :o : ´-, . . . . . . . . . .
. . . . . . . . . . . ,-´ :: ::: :: : : :: :::: :::: :: : : : : :O ´-, . . . . . . . . .
. . . . . . . . . .,-´ : :: :: :: :: :: : : : : : , : : :º :::: :::: ::’; . . . . . . . .
. . . . . . . . .,-´ / / : :: :: :: :: : : :::: :::-, ;; ;; ;; ;; ;; ;; ;\ . . . . . . . .
. . . . . . . . /,-´,’ :: : : : : : : : : :: :: :: : ´-, ;; ;; ;; ;; ;; ;;| . . . . . . .
. . . . . . . /,’,-´ :: :: :: :: :: :: :: : ::_,-~~,_’-, ;; ;; ;; ;; | . . . . . . .
. . . . . _/ :,’ :/ :: :: :: : : :: :: _,-´/ : ,-´;’-´’’’’~-, ;; ;; ;;,’ . . . . . . . .
. . . ,-´ / : : : : : : ,-´’’ : : :,--´’ :|| /,-´-´--´’’__,’’’ \ ;; ;,-´ . . . . . . . .
. . . \ :/,, : : : _,-´ --,,_ : : \ :\ ||/ /,-´-´x### ::\ \ ;;/ . . . . . . . . . .
. . . . \/ /---´’’’ : \ #\ : :\ : : \ :\ \| | : (O##º : :/ /-´’ . . . . . . . . . . .
. . . . /,’____ : :\ ´-#\ : \, : :\ :\ \ \ : ´-,___,-´,-`-,, . . . . . . . . . . .
. . . . ´ ) : : : :’’’’--,,--,,,,,,¯ \ \ :: ::--,,_’’-,,’’’¯ :’- :’-, . . . . . . . . .
. . . . .) : : : : : : ,, : ´’’’~~~~’ \ :: :: :: :’’’’’¯ :: ,-´ :,/\ . . . . . . . . .
. . . . .\,/ /|\\| | :/ / : : : : : : : ,’-, :: :: :: :: ::,--´’ :,-´ \ \ . . . . . . . .
. . . . .\\’|\\ \|/ ´/ / :: :_--,, : , | )’; :: :: :: :,-´’ : ,-´ : : :\ \, . . . . . . .
. . . ./¯ :| \ |\ : |/\ :: ::----, :\/ :|/ :: :: ,-´’ : :,-´ : : : : : : ´’-,,_ . . . .
. . ..| : : :/ ´’-(, :: :: :: ´’’’’~,,,,,’’ :: ,-´’ : :,-´ : : : : : : : : :,-´’’\\ . . . .
. ,-´ : : : | : : ´’) : : :¯’’’’~-,: : ,--´’’ : :,-´’ : : : : : : : : : ,-´ :¯’’’’’-,_ .
./ : : : : :’-, :: | :: :: :: _,,-´’’’¯ : ,--´’ : : : : : : : : : : : / : : : : : : :’’-,
/ : : : : : -, :¯’’’’’’’’’’’¯ : : _,,-~’’ : : : : : : : : : : : : : :| : : : : : : : : :
 : : : : : : :¯’’~~~~~~’’’ : : : : : : : : : : : : : : : : : : | : : : : : : : : :
 */
	// console.info("It's a trap!");
	quote = quote+1 >= swquotes.length ? 0 : quote+1;
	this.textContent = swquotes[quote];
};
// document.getElementById('evbp-btn').addEventListener("mouseover", evbpClick, true);
document.getElementById('evbp-btn').addEventListener("click", evbpClick, true);
// $('#evbp-btn').click(evbpClick); 

$('#evbp-btn2').click(function(){
	$('#evbp-btn').click();
});


// Console
$('.cls-btns').on('click', '.btn', function(){
	var $btn = $(this);
	
	if     ($btn.hasClass('csl-info'))  console.info('We are at the Sitges meeting room');
	else if($btn.hasClass('csl-log'))   console.log('log button clicked!', this);
	else if($btn.hasClass('csl-warn'))  console.warn('Tomorrow\'s max. temperature: 31ºC');
	else if($btn.hasClass('csl-error')) console.error('UBS servers destroyed');
	else if($btn.hasClass('csl-trace')) doSomethingAwesome();
	else if($btn.hasClass('csl-table')) {
		var arr = [
			['Gandalf','Wizard','35'],
			['Hurin','Warrior','100']
		];
		console.log(arr);
		console.table(arr);
		
		var obj = [
			{ title: 'Game of Thrones', author: 'George R. R. Martin', Published: 'August 6, 1996' },
			{ title: 'A Scanner Darkly', author: 'Philip K. Dick', Published: '1977' }
		];
		console.log(obj);
		console.table(obj);
		
		var Issue = function(type, priority, status, version) {
			this.type     = type;
			this.priority = priority;
			this.status   = status;
			this.version  = version;
		}
		var issues = {
			'0001' : new Issue('defect', 'minor', 'open', '1.0.1'),
			'0002' : new Issue('feature', 'critical', 'in development', '0.9.2'),
			'0003' : new Issue('bug', 'killer', 'Valdas morgulis', '6.6.6')
		};
		console.log(issues);
		console.table(issues, ['type', 'priority', 'status']);
	}
});

function doSomethingAwesome() {
	console.trace();
}

window.netcentric = window.netcentric || {};
window.netcentric.lightningTalks = {
	version: '2015.07.16',
	speakers: ['Erik Grijzen', 'Dora Angelov', 'Raul Parralejo'],
	start: function(){},
	stop: function(){},
	changeRoom: function(){}
};


// Timing & profiling
var memHole = [];
function expensiveFunc() {
	console.time("Array initialize");
	
	var arr = new Array(1000000);
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i] = new Object();
		if(i % 10000 == 0)
			addTimeStamp();
	};
	memHole.push(arr);
	
	console.timeEnd("Array initialize");
}
function addTimeStamp() {
	console.timeStamp("Adding timestamp");
}

$('#csltim-run').click(function(){
	expensiveFunc();
});
$('#csltim-profile').click(function(){
	console.profile("JS CPU");
	expensiveFunc();
	console.profileEnd("JS CPU");
});


	
// Utils

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
	console.count('randomInt() called');
	return Math.floor(Math.random() * (max - min)) + min;
}

} );