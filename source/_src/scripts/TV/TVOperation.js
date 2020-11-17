
function setFocusElement(e) {
	e.preventDefault()

	switch (e.keyCode) {			
        case TvKeyCode.KEY_UP:
			moveControl('up')
			break;

		case TvKeyCode.KEY_LEFT:			
			moveControl('left')
			break;
			
        case TvKeyCode.KEY_DOWN:
			moveControl('down')
			break;

		case TvKeyCode.KEY_RIGHT:
			moveControl('right')
			break;
			
		case TvKeyCode.KEY_PLAY_PAUSE:
			log('clicou no botao video')
			break;

		case TvKeyCode.KEY_ENTER:
			moveControl('enter')
			break;

		case TvKeyCode.KEY_PREVIOUS:
			log('clicou botao voltar')
			break;
	}
}

function moveControl(position) {
	var target = null;
	var current = $('.j_navi-current');
	var naviFunction = current.closest('[data-navi]').attr('data-navi-function');
	
	try {
		var myobj = JSON.parse(JSON.stringify(naviFunction + "('" +position+ "')"));
		myobj.callPluggins = new Function(myobj)();
	} catch (e) {		
		var type = current[0].tagName.toLowerCase();
		var items = current.closest('[data-navi]').find(type);
	
		switch (position){
			case 'up':
				items.each(function(index, el){
					if ($(el).hasClass('j_navi-current')) {
						target = items[index - 1]
						return;
					}	
				})
	
				if (!target) {
					var allNavi = $('html').find('[data-navi]');
					allNavi.each(function(index, el){
						if ($(el).find('.j_navi-current').length) {
							var offset = parseInt($(el).attr('data-navi')) - 1;
							if ($('[data-navi="'+ offset +'"]').length) {
								target = $('[data-navi="'+ offset +'"]').find('a:last, button:last, label:not(.noaction):last')[0]
								return;
							}
						}
					});
				}
				break;
	
			case 'left':
				items.each(function(index, el){
					if ($(el).hasClass('j_navi-current')) {
						target = items[index - 1]
						return;
					}
				})
				break;
	
			case 'right':
				items.each(function(index, el){
					if ($(el).hasClass('j_navi-current')) {
						target = items[index + 1]
						return;
					}
				})
				break;
	
			case 'down':
				items.each(function(index, el){
					if ($(el).hasClass('j_navi-current')) {
						target = items[index + 1]
						return;
					}
				})
	
				if (!target || type == 'label') {
					var allNavi = $('html').find('[data-navi]');
					allNavi.each(function(index, el){
						if ($(el).find('.j_navi-current').length) {
							var offset = parseInt($(el).attr('data-navi')) + 1;
	
							if ($('[data-navi="'+ offset +'"]').length) {
								target = $('[data-navi="'+ offset +'"]').find('a, button')[0]
								return;
							} else {
								target = $('[data-navi="100"]').find('a, button')[0]
							}
						}
					});
				}
	
				if (!target) {
					target = $('[data-navi="100"]').find('a, button')[0]
				}
	
				break;
				
			case 'enter':
				current.click()
				break;
	
			case 'back':
				var getPage = sessionStorage.getItem('navi_current');
				
				
				
				if (!getPage) {
					log('você não pode voltar');
				} else {
					
					window.history.back()
					
				}
				
				
				
				// return false;
				break;
	
		}


		if (target) {
			$(target).addClass('j_navi-current')
			current.removeClass('j_navi-current')

			if (!$('body').hasClass('pg-index')) {
				centralizeTV();
			}
		}
	}

	
}

function centralizeTV() {
	if ($('.j_navi-current').length) {

		// ORIGINAL

		// var docObj = $(window).height();
		// var docOffset = $(window).scrollTop();
		// var docObjHalf = (docObj / 2); // Metade do documento
		
		// var objHeight = $('.j_navi-current').get(0).getBoundingClientRect().height;
		// var objOffset = $('.j_navi-current').offset().top; // Offset
		// var objHeightHalf = (objHeight / 2); // Metade do objeto
	
		// if (objOffset > docObjHalf) {
		// 	// console.log('abaixo')
		// 	var Goto = (objOffset + objHeightHalf) - docObjHalf;
		// } else {		
		// 	// console.log('acima')
		// 	var Goto = docOffset - ((objOffset + docObjHalf) - objHeightHalf)
		// }
	
		// $('html, body').animate({scrollTop: Goto}, 150);





		var docObj = $(window).width();
		var docOffset = $(window).scrollLeft();

		console.log(docObj, docOffset)

		var docObjHalf = (docObj / 2); // Metade do documento
		
		var objHeight = $('.j_navi-current').get(0).getBoundingClientRect().height;
		var objOffset = $('.j_navi-current').offset().top; // Offset
		var objHeightHalf = (objHeight / 2); // Metade do objeto
	
		if (objOffset > docObjHalf) {
			// console.log('abaixo')
			var Goto = (objOffset + objHeightHalf) - docObjHalf;
		} else {		
			// console.log('acima')
			var Goto = docOffset - ((objOffset + docObjHalf) - objHeightHalf)
		}
	
		$('html, body').animate({scrollTop: Goto}, 150);



	}

}

function log(msg){
	if ( $('.log').length) { $('.log').html(msg) } 
	else { $('body').append('<div class="log">'+msg+'</div>'); }

	$('body').on('click', '.log', function(){
		$(this).fadeOut(function(){
			$(this).remove();
		})
	});

	setTimeout(function(){
		$('.log').fadeOut(function(){
			$('.log').remove();
		})
	}, 2500);
}

$(document).ready(function(){
	document.addEventListener('keydown', setFocusElement );
	document.addEventListener('tizenhwkey', function(e) {
		moveControl('back')
	});

});
