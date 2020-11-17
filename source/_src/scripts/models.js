
window.APPmodels =
{
        // LAYOUT PARA PRODUTO
        "PRODUCT" : '' 
        + '<div class="col-md-4 mb-4">'
            + '<a class="pdt j_pdt-href " href="produto.html?code=#CODE#&lang=#LANG#">'
                + '<div class="pdt-image j_pdt-img">'
                    + '<img class="lazy" data-src="https://imagens.portobello.com.br/unsafe/fit-in/300x300/https://www.portobello.com.br#IMAGE#">'
                + '</div>'
                + '<div class="pdt-details">'
                    + '<div class="pdt-title p-3">'
                        + '<span class="j_pdt-title">#NAME#</span>'
                    + '</div>'
                    + '<div class="pdt-specs pl-3 pr-3">'
                        + '<div class="row">'
                            + '<div class="col-6 pt-3 pb-3">'
                                + '<p class="item j_pdt-format">'
                                    + '<span>Formato</span>#FORMAT#'
                                + '</p>'
                            + '</div>'
                            + '<div class="col-6 pt-3 pb-3">'
                                + '<p class="item j_pdt-superf">'
                                    + '<span>Superfície</span>#SUPERF#'
                                + '</p>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</a>'
        + '</div>',

        // ====================================
        // [index.html][filtro] - ITEM COM OPÇÕES DO FILTRO
        "IDX_FILTER_ITEM" : '' 
        + "<div class='card'>"
            + "<div class='card-header' id='hd#COUNT#'>"
                + "<button class='fill-line' type='button' data-toggle='collapse' data-target='#tab#COUNT#' aria-expanded='false' aria-controls='tab#COUNT#'>"
                    + "<span>#NAME#</span>"
                + "</button>"
            + "</div>"
            + "<div id='tab#COUNT#' class='collapse collapsed' aria-labelledby='hd#COUNT#' data-parent='#filter'>"
                + "<div class='card-body'>"
                    + "<ul class='fill-line'>#LIS#</ul>"
                + "</div>"
            + "</div>"
        + "</div>",
        
        // [index.html][filtro] - LI's COM OS CHECKBOX PARA SELECIONAR UMA OPÇÃO DO FILTRO
        "IDX_FILTER_LI" : '' 
        + '<li>'
            + '<label>'
                + '<input type="checkbox"#CHECK# name="filter" value="#VALUE#"> '
                + '#NAME# <span>(#COUNT#)</span>'
            + '</label>'
        + '</li>',



				
}
