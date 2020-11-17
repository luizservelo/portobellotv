$(function() {
    $('html').on('submit', 'form.j_search', function(ev){
        ev.preventDefault()

        var pdtContainer = $('.list-products'),
            pdtsResult = $('.j_results'),
            button = $('.j_search').find('button'),
            search = $(this).find('input').val();
        
        button.addClass('load')

        loadingRequest('searchProducts', [search,null,1,10,{
            "0":"code",
            "1":"zoomImage",
            "2":"nominal_format",
            "3":"name",
            "4":"suffix",
            "ProductSurfaceFeature":["name"],
            "ProductFinishing":[ "name" ]
        },false,false], function(result){
            if (result) {
                button.removeClass('load')
                pdtContainer.html('')
                pdtsResult.html('<h1>Resultados da busca</h1><p>Total de <b>' +result.totalProducts+ ' produtos</b>. Se a busca retornou muitos resultados tente outros termos</p>');

                var products = result.results;
                
                $.each( products, function( key, value ) {
                    
                    var content = APPmodels.PRODUCT;
                    content = content.replace("#CODE#", value.code);
                    content = content.replace("#IMAGE#", value.zoomImage);
                    content = content.replace("#NAME#", value.name);
                    content = content.replace("#FORMAT#", value.nominal_format);
                    content = content.replace("#SUPERF#", value.ProductFinishing.name);

                    pdtContainer.append(content);
                });
            }
        });
    });
});