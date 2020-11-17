jQuery(document).ready(function($){
	$('body').removeClass('loading');

	//load splitscreen
	if ($('.main-splscr').length) {
		loadingIndex()
	}


	
})

function loadingIndex() {
	setTimeout(function(){
		$('img.load').fadeIn('300', function(){
			$('img.load').css('opacity', 1)
		})
		$('.loader-box').addClass('load')
		$('.main-header').css('opacity', '1')
		
		setTimeout(function(){
			$('.loader-box, .loader').fadeOut('fast')
			$('.main-splscr').addClass('loaded')
			$('.main-splscr').find('.signin').fadeIn(1200);
	// 	}, 100);
	// }, 100);
		}, 4500);
	}, 1500);
}

function changeLazyload() {
    $('.lazy').Lazy({
        effect: "fadeIn",
        effectTime: 400,
        threshold: 0,
        afterLoad: function(element) {
            var box = element.closest('div');
            box.addClass('lazy-ok')
        }
    });
}