var todos = [];
var checked = [];

$(function() {
    function addToStorage (todo_text) {
        todos.push(todo_text);
        checked.push(false);
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("checked", JSON.stringify(checked));
    }
    function addTodo (todo_text, bool_value) {
        var $todo = $("<div class='div-items'></div>");
        $todo.append($("<input class='items' type='checkbox'/>").prop('checked', bool_value));
        $todo.append($("<span class='span-items' contenteditable=true>").text(todo_text));
        $todo.append($("<input type='reset' class='remove-buttons' class='buttons' hidden='true' value ='X'>"));
        $('.list').append($todo);
    }

    if (localStorage.getItem("checked") !== null && localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
        checked = JSON.parse(localStorage.getItem("checked"));
    }
    if (todos.length == checked.length) {
        for (var i in todos) {
            addTodo(todos[i], checked[i]);
        }
        if (todos.length > 0) {
            $('#remove-all').show();
            $('#mark-all').show();
            if ($('.items:not(:checked)').length == 0) {
                $('#mark-all-box').prop('checked', true);
            }
        }
    } else {
        todos = [];
        checked = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("checked", JSON.stringify(checked));
    }

    $('form').submit(function() {
        var new_text = $('#add-item').val();
        addTodo(new_text);
        addToStorage(new_text);
        $('#add-item').val('');
        $('#remove-all').show();
        $('#mark-all').show();
        return false;
    });
});

function updateStorage () {
    var $list = $('.items').parent();
    todos = [];
    checked = [];
    for (var i = 0; i < $list.length; ++i) {
        todos.push($list[i].textContent);
        checked.push($list[i].children[0].checked);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("checked", JSON.stringify(checked));
}

$(document).on('click', '#remove-all', function() {
    var $list = $('.items:checked').parent();
    for (var i = 0; i < $list.length; ++i) {
        $list[i].remove();
    }
    updateStorage();
    if ($('.div-items').length == 0) {
        $('#remove-all').hide();
        $('#mark-all').hide();
        $('#mark-all-box').prop('checked', false);
    }
});

$(document).on('mouseover', '.div-items', function() {
    $($(this).children()[2]).show();
});

$(document).on('mouseout', '.div-items', function() {
    $($(this).children()[2]).hide();
});

$(document).on('click', '.remove-buttons', function() {
    var $removing = $(this).parent();
    $removing.remove();
    updateStorage();
    if ($('.div-items').length == 0) {
        $('#remove-all').hide();
        $('#mark-all').hide();
        $('#mark-all-box').prop('checked', false);
    }
});

$(document).on('change', '#mark-all-box', function() {
    if ($(this).is(':checked') == true) {
        $('.items').prop('checked', true);
    } else {
        $('.items').prop('checked', false);
    }
    updateStorage();
});
$(document).on('change', '.items', function() {
    if ($(this).is(':checked') == false) {
        if ($('#mark-all-box').is(':checked') == true) {
            $('#mark-all-box').prop('checked', false);
        }
    }
    if ($(this).is(':checked') == true) {
        if ($('.items:not(:checked)').length == 0) {
            $('#mark-all-box').prop('checked', true);
        }
    }
    updateStorage();
});





