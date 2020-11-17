jQuery(document).ready(function($){
	
	//set some variables
	var isAnimating = false,
		firstLoad = false,
		newScaleValue = 1;
		
	//cache DOM elements
	var mainContent = $('main'),
		loadingBar = $('#load-bar');

	var getLang = sessionStorage.getItem('language');
	lang = getLang ? getLang : 'pt_BR';

	//select a new section
	$('html').on('click', 'a:not(.noload), .main-footer a:not(.noload)', function(event){
		event.preventDefault();
		var target = $(this),
			sectionTarget = target.attr('href'); //detect which section user has chosen
			
		if( !target.hasClass('selected') && !isAnimating ) {
			triggerAnimation(sectionTarget, true); // if user has selected a section different from the one alredy visible - load the new content
		}

		if ($(this).closest('.main-footer').length) {
			$(this).closest('.main-footer').find('.active').removeClass('active')
			$(this).addClass('active')
		}

		firstLoad = true;
	});

	$(window).on('popstate', function() {
		// console.log('popstate')
		if (firstLoad) {
			// Safari emits a popstate event on page load - check if firstLoad is true before animating
			// if it's false - the page has just been loaded 
			var newPageArray = location.pathname.split('/'),
			//this is the url of the page to be loaded 

			newPage = newPageArray[newPageArray.length - 1].replace('.html', '');
			// newPage = newPage ? newPage : 'index';


			// console.log(newPage)

			if (!isAnimating) triggerAnimation(newPage, false);
		}
		firstLoad = true;
	});

	// ---------------------------
	// DEFAULT LOAD PAGE FUNCTIONS
	// ---------------------------
	function triggerAnimation(newSection, bool) {
		isAnimating =  true;
		newSection = ( newSection == '' ) ? 'index' : newSection;
		initializeLoadingBar();
		loadNewContent(newSection, bool);
	}

	function initializeLoadingBar() {
		loadingBar.css({
		    width: 35
		}).attr('class', '').addClass('loading');
	}

	function loadNewContent(newSection, bool) {
		var fullURL = newSection;
		var newSection = newSection.split('.')[0]; 

		// split url for params
		params = [];
		var urlParams = fullURL.split('?');
		delete(urlParams[0]);

		if (!isEmpty(urlParams)) {
			var urlParams = urlParams.join();
			var urlParams = urlParams.replace(',', '');
			var urlParams = urlParams.split('&');
	
			urlParams.forEach(function(item){
				var variable = item.split('=');
				params.push({'info': variable[0], 'value': variable[1] });
			});
		} else {
			params = null;
		}

		mainContent.css('opacity', '.5');

		setTimeout(function(){
			loadingBarAnimation();
			
			var section = $('<section class="main-content overflow-hidden"></section>').appendTo(mainContent);
			var newPage = (newSection == 'index') ? 'index' : 'pg-' + newSection;
			
			// console.log(newSection)

			section.load(newPage + '.html .main-content > *', function(event){
				//get page content 
				loadingContent(newSection, params, function(container){
					switch (newSection) {
						case 'produtos':
							section.find('.side-filter--container').html(container.sidebar)
							section.find('.products--container').html(container.products)
							section.find('.j_pdt-href:first').addClass('j_navi-current');
							section.find('.j_pagination').html(container.pager);

							changeLazyload()
							break;
							
						case 'produto':

							section.find('.j_name').html(container.pdtName)
							section.find('.j_pdtSpecs').html(container.pdtSpecs)
							section.find('.j_pdtCarousel').html(container.pdtCarousel)

							

							setNoload('.j_pdtSpecs')
							setNavis('.surfaces-container', 2)
							setNavis('.dimensions-container ul:nth-of-type(1)', 3)
							setNavis('.dimensions-container ul:nth-of-type(2)', 4)
							setNavis('.dimensions-container ul:nth-of-type(3)', 5)
							setNavis('.dimensions-container ul:nth-of-type(4)', 6)
							setNavis('.dimensions-container ul:nth-of-type(5)', 7)
							changeLazyload()
							changeOwl()
							break;

						case 'index':
							loadingIndex()
							selectFlags()
							break;
					}

					var scaleMax = loadingBar.data('scale');
					loadingBar.velocity('stop').velocity({
						scaleY: scaleMax
					}, 400, function(){
						$('html, body').animate({scrollTop: 0}, 400);

						$('body').attr('class', '').addClass('pg-'+newSection)
						$('body').addClass('lang-' + lang)
	
						section.prev('section.visible').removeClass('visible').fadeOut().end().addClass('visible').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
							resetAfterAnimation(section);
						});
	
						if( $('.no-csstransitions').length > 0 ) {
							resetAfterAnimation(section);
						}

						mainContent.css('opacity', '1')	

						var url = 'pg-'+newSection+'.html';
						if (url!=window.location && bool){
							window.history.pushState({path: url},'',url);





							sessionStorage.setItem('navi_current', fullURL)



						}
					});
				});
			});

		}, 50);
	}

	function loadingBarAnimation() {
		var scaleMax = 40;
		if ( newScaleValue + 2 < 25) {
			newScaleValue = newScaleValue + 2;
		} else if ( newScaleValue + 0.5 < 34 ) {
			newScaleValue = newScaleValue + 0.5;
		} else if ( newScaleValue < scaleMax ) {
			newScaleValue = newScaleValue + 0.1;
		}

		loadingBar.velocity({
			scaleX: newScaleValue
		}, 200, loadingBarAnimation);
	}

	function loadingContent(newSection, params, callback) {
		switch (newSection) {
			case 'produtos':
				makePGproducts(params, function(page){
					return callback({
					    sidebar: page.sidebar,
					    products: page.products,
					    pager: page.pager
					})
				});
				break;

			case 'produto':
				makePGproduct(params, function(page){
					// console.log(page)
					return callback({
						pdtName: page.pdtName,
						pdtCarousel: page.pdtCarousel,
						pdtSpecs: page.pdtSpecs,
					})
				});
				break;

			default:
				return callback(null)
		}
	}

	function resetAfterAnimation(newSection) {
		newSection.removeClass('overflow-hidden').prev('.main-content').remove();
		isAnimating =  false;
		resetLoadingBar();
	}

	function resetLoadingBar() {
		loadingBar.removeClass('loading').velocity({
			scaleY: 1
		}, 1);
	}

	function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
				return false;
		}
		return true;
	}
});

function setNoload(element) {
	var target = $('body').find(element);
	target.find('a').addClass('noload')
}

function setNavis(element, num) {
	$(element).attr('data-navi', num);
	if (!$('.main-content:not(.visible) .j_navi-current').length) {
		$(element).find('a:first').addClass("j_navi-current")
	}
}

function loadingRequest(endpoint, variables, callback) {
	var lang = params.find(function(data){
		return data.info === 'lang';
	}).value;

	var lang = lang ? lang : 'pt_BR';
	sessionStorage.setItem('language', lang)

	var path = 'https://www.portobello.com.br/rpc/json/WSPortobelloSite?lang=' + lang;
	var foo = new $.JsonRpcClient({ ajaxUrl: path });

	foo.call(
		endpoint, variables,
		function(result) { 
			return callback(result);
		},
		function(error)  { 
			console.log('Server not respond');
			log('Falha de conexão')
		} 
	);
}

