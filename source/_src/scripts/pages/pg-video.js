$(function(){

    video = $('.video-container');
    videoBtn = $('.j_getVideo');

    // ABRIR E FECHAR VIDEO
    $('html').on('click', '.j_getVideo', function(){
        var playVideo = document.getElementById('main-video');

        // $('body, html').css('overflow', 'hidden').animate({scrollTop: 0}, 50);

        video.fadeIn();
        videoBtn.css({'opacity':'.3','pointer-events':'none'});

        $('.j_navi-current').removeClass('j_navi-current')

        $('.close').addClass('j_navi-current')

        playVideo.play();


        return false;
    }).on('click', '.video-container .close', function(){

        // $('body, html').css('overflow', 'inherit');
        $('.j_navi-current').removeClass('j_navi-current')
        video.fadeOut();
        videoBtn.css({'opacity':'1','pointer-events':'inherit'}).addClass('j_navi-current');
        centralizeTV()
    });


    // REPRODUCAO    
    $('html').on('click', '.j_play', function(){
        var playVideo = document.getElementById('main-video'),
            status = $(this).hasClass('play') ? 1 : 0;

        if (status) {
            playVideo.pause();
            $(this).removeClass('play').addClass('pause')
        } else {
            playVideo.play();
            $(this).addClass('play').removeClass('pause')
        }
    });
});

