$(document).ready(function() {
    var wrapperwidth = $('#slider').width() * $('#slider ul > li').size();
    $('#slider ul').css('width', wrapperwidth);
    var wrapperheight = $('#slider').height();
    $('#slider ul').css('height', wrapperheight);
    var width = $('#slider').width();
    $('#slider ul li').css('width', width);
    var counter = $('#slider ul > li').size();
    var decount = 1;
    var autocount = 1;
    var createNum = 1;
    $('#numbers li:first-child').html(createNum).addClass('activenum').attr('id', 'id1');
    while (createNum != counter) {
        $('#numbers li:last-child').after('<li>  </li>');
        createNum++;
        $('#numbers li:last-child').html(createNum);
        $('#numbers li:last-child').attr('id', 'id' + createNum)
    }
    var numwidth = $('#numbers li:first-child').width() * $('#numbers li').size();
    $('#numbers').css('width', numwidth);

    function goNext() {
        if (decount != counter) {
            $('#slider ul').animate({
                left: '-=' + $('#slider').width()
            }, 400, 'swing', function() {});
            $('.activenum').removeClass('activenum').next().addClass('activenum');
            decount++;
            window.location.hash = decount
        }
    }

    function goBack() {
        if (decount != 1) {
            $('#slider ul').animate({
                left: '+=' + $('#slider').width()
            }, 400, 'swing', function() {});
            $('.activenum').removeClass('activenum').prev().addClass('activenum');
            decount--;
            window.location.hash = decount
        }
    }
    $("#numbers li").click(function() {
        var clickednum = $(this).html() * -$('#slider').width() + $('#slider').width();
        $('#slider ul').animate({
            left: clickednum
        }, 400, 'swing', function() {});
        $('.activenum').removeClass('activenum');
        $(this).addClass('activenum');
        decount = $(this).html();
        window.location.hash = $(this).html()
    });
    if (window.location.hash != '') {
        var hashnum = window.location.hash.substr(1) * -$('#slider').width() + $('#slider').width();
        $('#slider ul').animate({
            left: hashnum
        }, 0, function() {});
        decount = window.location.hash.substr(1);
        $('.activenum').removeClass('activenum');
        var hashname = window.location.hash.substr(1);
        $('#id' + hashname).addClass('activenum')
    }
    $("#right").click(function() {
        goNext()
    });
    $("#left").click(function() {
        goBack()
    });
});