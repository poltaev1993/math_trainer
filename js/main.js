'use strict';

var characters = ['+', '-'];
var simbols = ['giphy.gif', 'giphy.gif', 'giphy.gif', 'giphy.gif',];
var bg = ['bgp1', 'bgp2', 'bgp1', 'bgp2', 'bgp1', 'bgp2', 'bgp1', 'bgp2', 'bgp1', 'bgp2'];
var parameters = ['result', 'a', 'b'];
var gameResults = [];
var step = 0;
var level = 1;
var mistakes = 0;
var inst;
$(function(){
    inst = $('[data-remodal-id="game-results"]').remodal();
    var expressions = getTasks();

    /* Event on play button */
    $('#play').on('click', function(){
        $('.section').removeClass('show');
        $('.game').addClass('show');
    });

    /* Events on choosen button option */
    $('.btn-options').on('click', function(){
        $('.btn-options').prop('disable', true);
        var th = $(this);
        var parameter = expressions[step].variable;
        console.log(th.text(), expressions[step][parameter + '']);
        if(th.text() == expressions[step][parameter + '']){
            $('#' + parameter).find('.number').text(expressions[step][parameter + '']);
            step++;
            /*setTimeout(function(){
                render(expressions, step);
            }, 1000);*/
            $('.next__js').show();
        } else {
            $('#' + parameter).find('.mistake').text(th.text());
            $('#' + parameter).find('.number').text(expressions[step][parameter + '']);
            mistakes++;
            step++;
            $('.btn-options').prop('disabled', true);
            /*setTimeout(function(){
                render(expressions, step);
            }, 1000);*/
            $('.next__js').show();
        }
    });

    $('#levelUp').on('click', function(){
        level++;
        step = 0;
        gameResults[level-1] = {mistakes: mistakes};
        expressions = getTasks();
        mistakes = 0;
        render(expressions, step);
        inst.close();
    });

    $('.next__js').on('click', function () {
        render(expressions, step);
    })

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
        if(level > 1){
            o[i].variable = parameters[randomBetween(0, 2)];
        } else {
            o[i].variable = parameters[0];
        }
    }
    return o;
}

var clear = function(step){
    $('.next__js').hide();
    $('.btn-options').prop('disabled', false);
    $('body').attr('class', '');
    $('body').addClass('bgp' + (step + 1));
    $('#a, #b, #result').find('.view').html('');
}

var render = function(exp, step){
    $('.view').removeClass('hide');
    if(step < Object.size(exp)){
        clear(step);
        var sim = simbols[randomBetween(0, 4)];
        //First number
        imageInset($('#a').find('.view'), exp[step].a, sim);
        $('#a').find('.number').text(exp[step].a);

        //Symbol
        $('#ch').text(exp[step].ch);

        //Second number
        imageInset($('#b').find('.view'), exp[step].b, sim);
        $('#b').find('.number').text(exp[step].b);

        // Result
        imageInset($('#result').find('.view'), exp[step].result, sim);
        $('#result').find('.number').text(exp[step].result);

        var $btnOptions = $('.btn-options');
        var ind = randomBetween(0, 6);
        var ready = renderAnswers(exp, $btnOptions);
        var p = exp[step].variable;
        if(!ready){
            $btnOptions.eq(ind).text(exp[step][p + '']);
        }
        console.log(exp);

        $('#' + p).find('.number').text('');
        $('#' + p).find('.view').html('');
        $('#' + p).find('.view').addClass('hide');
        $('#' + p).find('.view').hide();
        $('.mistake').text('');
    } else {
        $('#modal-results').text(Object.size(exp) - mistakes);
        inst.open();
    }

    $('#first').find('.p-view').html($('#a').find('.view').html());
    $('#second').find('.p-view').html($('#b').find('.view').html());
    $('#res').find('.p-view').html($('#result').find('.view').html());
    $('#sim').text($('#ch').text());
}

var renderAnswers = function(exp, el){
    var p = exp[step][p + ''];
    var ready = false;
    el.each(function(){
        var rand = randomBetween(0, 20);
        var randValues = true;
        while(randValues){
            el.each(function(){
                if(rand == +$(this).text()){
                    rand = randomBetween(0, 20);
                    randValues = true;
                } else {
                    randValues = false;
                }
            });
        }
        if(rand == p){
            ready = true;
            $(this).text(rand);
        } else {
            $(this).text(rand);
        }
    });
    return ready;
}

var imageInset = function(el, length, file){
    for(var i = 0; i < length; i++){
        el.append('<img src="img/' + file + '" width="50"/>');
    }
    el.css('width', length * 50 + 25);
    el.show();
}

var randomBetween = function(a, b){
    return Math.floor(Math.random() * b) + a;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};