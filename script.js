$(function() {
    $('form').submit(function() {
        var new_text = $('#add-item').val();
        var a = $("<div class='div-items'></div>");
        a.append($("<input class='items' type='checkbox'/>"));
        a.append($("<span class='span-items' contenteditable=true>").text(new_text));
        a.append($("<input type='reset' class='remove-buttons' class='buttons' hidden='true' value ='X'>"));
        $('.list').append(a);
        $('#add-item').val('');
        $('#remove-all').show();
        return false;
    });
});

$(document).on('click', '#remove-all', function() {
    var list = $($('.items:checked').parent());
    for (var i = 0; i < list.length; ++i) {
        $(list[i]).remove();
    }
    if ($('.div-items').length == 0) {
        $('#remove-all').hide();        
    }
});

$(document).on('mouseover', '.div-items', function() {
    $($(this).children()[2]).show();
});

$(document).on('mouseout', '.div-items', function() {
    $($(this).children()[2]).hide();
});

$(document).on('click', '.remove-buttons', function() {
    var removing = $($(this).parent());
    removing.remove();
    if ($('.div-items').length == 0) {
        $('#remove-all').hide();        
    }
});

$(document).on('change', '#mark-box', function() {
    if ($(this).is(':checked') == true) {
        $('.items').prop('checked', true);
    } else {
        $('.items').prop('checked', false);
    }
});
$(document).on('change', '.items', function() {
    if ($(this).is(':checked') == false) {
        if ($('#mark-box').is(':checked') == true) {
            $('#mark-box').prop('checked', false);
        }
    }
    if ($(this).is(':checked') == true) {
        if ($('.items:not(:checked)').length == 0) {
            $('#mark-box').prop('checked', true);
        }
    }
});





