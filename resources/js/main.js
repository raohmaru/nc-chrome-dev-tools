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
	this.textContent = "It's a trap!";
};
// document.getElementById('evbp-btn').addEventListener("mouseover", evbpClick, true);
document.getElementById('evbp-btn').addEventListener("click", evbpClick, true);
// $('#evbp-btn').click(evbpClick); 

	
// Utils

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

} );