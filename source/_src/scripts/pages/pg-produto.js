
$(function(){

    setNoload('.j_pdtSpecs')
    changeOwl()



    // TABS :: Tabs para selecionar superficies
    $('html').on('click', '.surfaces-container a', function(e){
        e.preventDefault()
        
        var button = $(this);
        var target = button.attr('href').replace('#','');

        // TABS
        $('.dimensions').css({'display':'none'})
        $('.dimensions#' +target+ '-dimensions').css({'display':'flex'})
        clickDimension($('.dimensions#' +target+ '-dimensions li:first a'));
        
        $('.surfaces-container a').removeClass('selected')
        button.addClass('selected')

        return false;
    })


    // TABS :: Lista de medidas do produto
    $('html').on('click', '.dimensions a', function(e){
        e.preventDefault()
        clickDimension($(this))
        return false;
    })

})





function changeOwl() {
    $('.pdt-owl').owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoHeight: true,
        autoplayHoverPause: true,
        lazyLoad: true,
        lazyLoadEager: 1
    });
}

function clickDimension(element) {
    var button = element;
    var target = button.attr('href');
    
    var parent = button.closest('ul')
    var lisa = parent.find('a')
    var fullWidth = parent.width()

    if (button.offset().left < (fullWidth / 2)){
        var goto = button.offset().left - button.width()
        parent.animate({ scrollLeft: goto }, 400);
    } else {
        var goto = button.offset().left;
        parent.animate({ scrollLeft: goto }, 400);
    }

    lisa.addClass('changed')
    lisa.removeClass('selected')
    button.addClass('selected')

    $('.pb-productstabs-tab').removeClass('selected')
    $('.pb-productstabs-tab' +target).addClass('selected')
}




function makePGproduct(params, callback){
    var product = params.find(function(data){
        return data.info === 'code';
    }).value;

    loadingRequest('getProductByCode', [""+product+"",{
        '0': "description",
        '1': "nominal_format",
        '2': "relatedImages",
        '3': "zoomImage",
        '4': "line",
        '5': "brand",
        '6': "type",
        '7': "suffix",
        '8': "link",

        Line: ["name", "slug"],
        ProductFinishing: ["id", "name"]
    }], function(result){
        if (result) {

            var request = makeHttpObject();
            request.open("GET", "https://www.portobello.com.br/" + result.link, true);
            request.send(null);
            request.onreadystatechange = function() {
                if (request.readyState == 4) {            
                    var fullPage = request.responseText;
            
                    // GET IMAGES
                    var carousel = [];
                    var requestImages = $(fullPage).find('.carousel-main img[data-lazy]')
                    
                    $.each(requestImages, function(i, value){
                        var source = $(value).attr('data-lazy');
                        carousel.push('<div class="item"><img class="owl-lazy" data-src="'+source+'"></div>')
                    });
                    carousel = carousel.join('');

                    // GET SPECS
                    var requestTabsLis = $(fullPage).find('aside').html()
                    var requestSpecsContainer = $(fullPage).find('.pb-productstabs-container').html()
                    var requestSpecs = requestTabsLis + requestSpecsContainer;

                    return callback({
                        pdtName: result.description,
                        pdtCarousel: carousel,
                        pdtSpecs: requestSpecs,
                    })
                }
            };
        }
    });
}
    

function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
  
    throw new Error("Could not create HTTP request object.");
}
  

function naviProduct_specs(position) {
	var current = $('.j_navi-current');
    var type = current[0].tagName.toLowerCase();
    var items = current.closest('[data-navi]').find(type);

    switch (position){
        case 'up':
            items.each(function(index, el){
                if ($(el).hasClass('j_navi-current')) {
                    target = items[index - 3]
                    return;
                }	
            })
            break;

        case 'left':
            items.each(function(index, el){
                if ($(el).hasClass('j_navi-current')) {
                    target = items[index - 1]
                    return;
                }
            })

            if (!target) {
                target = $('[data-navi="1"] button')[0]
            }
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
                    target = items[index + 3]
                    return;
                }
            })

            if (!target) {
                var allNavi = $('html').find('[data-navi]');
                allNavi.each(function(index, el){
                    if ($(el).find('.j_navi-current').length) {
                        var offset = parseInt($(el).attr('data-navi')) + 1;

                        if ($('[data-navi="'+ offset +'"]').length) {
                            target = $('[data-navi="'+ offset +'"] li:not(.active) a')[0]
                            return;
                        } else {
                            target = $('[data-navi="100"]').find('a, button')[0]
                        }
                    }
                });
            }
            break;
            
        case 'enter':
            current.click()
            break;

        case 'back':
            return false;
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
