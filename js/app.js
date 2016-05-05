$(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        setToMiddle($(window), $('.game'));
    }

    $(window).resize(function(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            setToMiddle($(window), $('.game'));
        }
    });
    $('.prompt-btn').on('click', function(){
        $('.prompt').addClass('show');
        setToMiddle($('.prompt'), $('.p_container'));
    });

    $('.prompt').on('click', function(){
        $('.prompt').removeClass('show');
    });

   var optionSldier = new Swiper('#option-slider', {
       nextButton: '#option-slider .swiper-button-next',
       prevButton: '#option-slider .swiper-button-prev',
       speed: 700,
       autoplay: 5000
   });


    $('.sound').click(function() {
        var audio = document.getElementById('bg-audio');
        if (audio.paused == false) {
            $(this).addClass('turn-off');
            audio.pause();
        } else {
            $(this).removeClass('turn-off');
            audio.play();
        }
    });
});

var setToMiddle = function (parent, child) {
    var pHeight, chHeight, diff

    pHeight = parent.innerHeight();
    chHeight = child.innerHeight();
    diff = pHeight / 2 - chHeight / 2;

    child.css('margin-top', diff);
}

