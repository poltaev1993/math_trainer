'use strict';

var characters = ['+', '-'];
var simbols = ['giphy.gif', 'giphy.gif', 'giphy.gif', 'giphy.gif',];
var bg = ['bgp1', 'bgp2', 'bgp1', 'bgp2', 'bgp1', 'bgp2', 'bgp1', 'bgp2', 'bgp1', 'bgp2'];
var step = 0;
var level = 0;
var mistakes = 0;
$(function(){
    $('#play').on('click', function(){
        $('.section').removeClass('show');
        $('.game').addClass('show');
    });

    var expressions = getTasks();
    $('.btn-options').on('click', function(){
        var th = $(this);
        if(th.text() == expressions[step].result){
            $('#result').text(expressions[step].result);
            step++;
            setTimeout(function(){
                render(expressions, step);
            }, 1000);

        } else {
            $('#mistake').text(th.text());
            $('#result').text(expressions[step].result);
            mistakes++;
            step++;
            setTimeout(function(){
                render(expressions, step);
            }, 1000);
        }
    });
    render(expressions, step);
});

var getTasks = function(){
    var o = {};
    for(var i = 0; i < 10; i++){
        o[i] = {};
        o[i].a = randomBetween(1, 9);
        o[i].ch = characters[randomBetween(0, 2)];
        if(o[i].ch == '-'){
            o[i].b = randomBetween(1, o[i].a);
            o[i].result =  o[i].a - o[i].b;
        } else {
            o[i].b = randomBetween(1, 9);
            o[i].result = o[i].a + o[i].b;
        }
    }
    return o;
}
var render = function(exp, step){
    $('body').attr('class', '');
    $('body').addClass('bgp' + (step + 1));
    var sim = simbols[randomBetween(0, 4)];
    $('#a, #b').find('.view').html('');
    imageInset($('#a').find('.view'), exp[step].a, sim);
    $('#a').find('.number').text(exp[step].a);
    $('#ch').text(exp[step].ch);
    imageInset($('#b').find('.view'), exp[step].b, sim);
    $('#b').find('.number').text(exp[step].b);

    var $btnOptions = $('.btn-options');

    var ready = false;
    $btnOptions.each(function(){
        var rand = randomBetween(0, 20);
        if(rand == exp[step].result){
            ready = true;
            $(this).text(rand);
        } else {
            $(this).text(rand);
        }
    });
    var ind = randomBetween(0, 6);
    if(!ready){
        $btnOptions.eq(ind).text(exp[step].result);
    }
    $('#result').text('');
    $('#mistake').text('');
}

var imageInset = function(el, length, file){
    for(var i = 0; i < length; i++){
        el.append('<img src="img/' + file + '" width="100"/>');
    }
}

var randomBetween = function(a, b){
    return Math.floor(Math.random() * b) + a;
}
