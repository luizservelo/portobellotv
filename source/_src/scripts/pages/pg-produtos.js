$(function(){


    $('html').on('click', 'button[data-toggle="collapse"][aria-expanded="false"]', function(){
        var target = $(this).attr('data-target');

        if (!$(target).hasClass('show')) {
            $(this).removeClass('j_navi-current')
            $(target).find('label:first').addClass('j_navi-current');
        } else {
            console.log($(this))
            $(this).addClass('j_navi-current')
            $('label').removeClass('j_navi-current')
        }
    })

});


function makePGproducts(params, callback){
    var channel = params.find(function(data){
        return data.info === 'channel';
    }).value;

    var page = params.find(function(data){
        return data.info === 'page';
    }).value;

    var lang = params.find(function(data){
        return data.info === 'lang';
    }).value;

    loadingRequest('getFilterData', ["data[SalesChannel][1][" +channel+ "]=1"], function(result){
        boxSidebar = [];						
        
        if (result) {
            
            $.each(result, function(index, value){

                if (index == 'Type') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 0);
                }

                if (index == 'Category') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 1);

                    childs = getChildrens(value[3].childrens, index, value[3].id);
                    setSidebar(value[3].id, value[3].name, childs, 2);
                }

                if (index == 'Line') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 3);
                }

                if (index == 'TechnicalApplication') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 4);
                }

                if (index == 'Color') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 6);
                }

                if (index == 'Format') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 7);
                }
                
                if (index == 'Edge') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 8);
                }
                
                if (index == 'Surface') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 9);
                }

                if (index == 'Ambient') {
                    childs = getChildrens(value[1].childrens, index, value[1].id);
                    setSidebar(value[1].id, value[1].name, childs, 10);
                }
            })

            function setSidebar(id, name, childs, off) {
                var count = off + 1;
                var content = APPmodels.IDX_FILTER_ITEM;

                content = content.replace(/#COUNT#/g, count);
                content = content.replace("#NAME#", name);
                content = content.replace("#LIS#", childs);
                boxSidebar[off] = content;
            }

            function getChildrens(value, index, id) {
                getChilds = '';
                
                $.each(value, function(cindex, cvalue){
                    var check = cvalue.checked ? 'checked ' : ' ';
                    var content = APPmodels.IDX_FILTER_LI;
                    var setValue = "data["+index+"]["+id+"]["+id+"]=1";

                    content = content.replace("#CHECK#", check);
                    content = content.replace("#VALUE#", setValue);
                    content = content.replace("#COUNT#", cvalue.count);
                    content = content.replace("#NAME#", cvalue.name);

                    getChilds = getChilds + content;
                });
                return getChilds;
            }

            // GET PRODUCTS
            loadingRequest('searchProductsGroupped', ["","data[SalesChannel][1][" +channel+ "]=1",page,15, {
                '0': "description",
                '1': "nominal_format",
                '2': "link",
                '3': "id",
                '4': "code",
                '5': "slug",
                '7': "release",
                '8': "zoomImageSize",
                '9': "zoomImage",
                '10': "line",
                '12': "brand",
                '13': "type",
                '14': "suffix",
                '15': "name",
                Line: ["name", "slug"],
                ProductFinishing: ["id", "name"]
            }, false, "part_class DESC, p1.description ASC",{}], function(data){
                if (data) {
                    boxProducts = [];
                    $.each(data.results, function(i, value){
                        $.each(value.products, function(i, value){
                            var content = APPmodels.PRODUCT;

                            content = content.replace("#NAME#", value.description );
                            content = content.replace("#CODE#", value.code);
                            content = content.replace("#IMAGE#", value.zoomImage);
                            content = content.replace("#FORMAT#", value.nominal_format);
                            content = content.replace("#SUPERF#", value.ProductFinishing.name);
                            content = content.replace("#LANG#", lang);
        
                            boxProducts[i] = content;
                        })
                    })

                    var lastPager = data.total;
                }

                return callback({
                    sidebar: boxSidebar,
                    products: boxProducts,
                    pager: getPager(lang, channel, 3, page, lastPager)
                })
            });
        }
    });    
}

function getPager(lang, channel, limit, offset, total) {
    result = [];
    var Paginas = total;
    var MaxLinks = limit; 
    var offset = parseInt(offset);
    
    if ((offset - MaxLinks) > 1) {
        result.push('<li class="page-item"><a href="produtos.html?channel=' +channel+ '&page=1&lang='+lang+'" class="page-link">1</a></li>')
        if ((offset - MaxLinks) > 2) {
            result.push('<li class="page-item pt-2">...</li>')
        }
    }

    for (index = offset - MaxLinks; index <= offset - 1; index++) {
        if (index >= 1) {
            result.push('<li class="page-item"><a href="produtos.html?channel=' +channel+ '&page='+index+'&lang='+lang+'" class="page-link">'+index+'</a></li>')
        }
    }
    result.push('<li class="page-item active"><a href="produtos.html?channel=' +channel+ '&page='+offset+'&lang='+lang+'" class="page-link">'+offset+'</a></li>')
    for (index = offset + 1; index <= offset + MaxLinks; index++) {
        if (index <= Paginas) {
            result.push('<li class="page-item"><a href="produtos.html?channel=' +channel+ '&page='+index+'&lang='+lang+'" class="page-link">'+index+'</a></li>')
        }
    }

    if ((offset + MaxLinks) < total) {
        if (((offset + MaxLinks) + 1) < total) {
            result.push('<li class="page-item pt-2">...</li>')
        }
        result.push('<li class="page-item"><a href="produtos.html?channel=' +channel+ '&page='+total+'&lang='+lang+'" class="page-link">'+total+'</a></li>')
    }
    
    return result.join('')
}

function naviProducts_grid(position) {
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

function naviProducts_filter(position) {
	var current = $('.j_navi-current');
    var type = current[0].tagName.toLowerCase();
    var items = (type == 'button') ? current.closest('[data-navi]').find(type) : current.closest('.card-body').find(type);

    switch (position){
        case 'up':
            items.each(function(index, el){
                if ($(el).hasClass('j_navi-current')) {
                    target = items[index - 1]
                    return;
                }
            })
            if (!target && type == 'button') {
                return false;
            } else if (!target) {
                target = current.closest('.card').find('button')
            }
            break;

        case 'right':
            if (type == 'button') {
                var thisNavi = current.closest('[data-navi]').attr('data-navi')
                target = $($('[data-navi="'+ (parseInt(thisNavi) + 2) +'"] a')[0])
            } else {
                return false;
            }
            break;

        case 'down':
            items.each(function(index, el){
                if ($(el).hasClass('j_navi-current')) {
                    target = items[index + 1]
                    return;
                }
            })

            if (!target && type == 'button') {
                var thisNavi = current.closest('[data-navi]').attr('data-navi')
                target = $('[data-navi="'+ (parseInt(thisNavi) + 1) +'"] a')[0]
            }
            break;
            
        case 'enter':
            current.click()           
            
            if (current.attr('aria-expanded') != "true") {
                current.addClass('j_navi-current')
                return false;
            }
            break;

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