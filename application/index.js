let files = [];

$(function () {
    document.activeElement.addEventListener('keydown', handleKeydown);
    $.getPath(function (file) {
        files.push(file);
        var item = '<div class="item">' + file.name + '</div>';
        $('.items').append(item);
    });
});

function handleKeydown(e) {
    if (e.key != "EndCall")
        e.preventDefault();
    switch (e.key) {
        case 'ArrowUp':
            nav(-1);
            break;
        case 'ArrowDown':
            nav(1);
            break;
        case 'Q':
        case 'SoftLeft':
            if (current > -1) {
                var file = files[current];
                $.getFileType(file, function (encoding) {
                    if (encoding != '') {
                        console.log(encoding)
                    }
                    else
                        alert('不支持的文件编码！');
                });
            }
            break;
        case 'Backspace':
            if (confirm("是否退出？"))
                window.close();
            break;
    }
}

var current = -1;
function nav(move) {
    var next = current + move;
    const items = document.querySelectorAll('.item');
    if (next >= items.length) {
        next = items.length - 1;
    }
    else if (next < 0) {
        next = 0;
    }
    const targetElement = items[next];
    $(items).removeClass('select');
    if (targetElement) {
        current = next;
        $(targetElement).addClass('select');
        targetElement.focus();
    }
}
