$(function(){


    
    selectFlags();

    
});

function selectFlags() {
    // SELECIONAR BANDEIRAS
    $('.flags label').each(function(i, target){
        var observer = new MutationObserver( handleMutationObserver );
        var config = { childList: true, attributes: true };
        
        function handleMutationObserver( mutations ) {
            mutations.forEach(function(mutation) {
                if ($(mutation.target).hasClass('j_navi-current')) {
                    $(mutation.target).closest('ul').find('input').attr('checked', false);
                    $(mutation.target).closest('li').find('input').attr('checked', true)

                    // SET LANGUAGE
                    var thisLang = $(mutation.target).closest('li').find('input').val();
                    $('.channels a').each(function(index, el){
                        var link = $(el).attr('href')
                        var params = link.split('lang=')[0]; 
                        $(el).attr('href', params + 'lang=' + thisLang)
                    })

                    $('body').attr('class', 'pg-index lang-' + thisLang);
                    
                } else {
                    if ( $(mutation.target).closest('ul').find('.j_navi-current').length ) {
                        $(mutation.target).closest('li').find('input').attr('checked', false)
                    }
                }
            });
        }
        observer.observe( target, config );
    });
}

function naviHome_flags(position) {
	var current = $('.j_navi-current');
    var type = current[0].tagName.toLowerCase();
    var items = current.closest('[data-navi]').find(type);

    switch (position){
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
            var thisNavi = current.closest('[data-navi]').attr('data-navi')
            target = $($('[data-navi="'+ (parseInt(thisNavi) + 1) +'"] a')[0])
            break;
            
        case 'enter':
            naviHome_flags('down')
            break;

        case 'up':
            return false
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

function naviHome_channels(position) {
	var current = $('.j_navi-current');
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
                var thisNavi = current.closest('[data-navi]').attr('data-navi')
                target = $($('[data-navi="'+ (parseInt(thisNavi) - 1) +'"] input[checked] + label'))
            }
            break;

        case 'down':
            items.each(function(index, el){
                if ($(el).hasClass('j_navi-current')) {
                    target = items[index + 1]
                    return;
                }
            })
            break;
            
        case 'enter':
            current.click()
            break;
        
        case 'right':
        case 'left':
            return false
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