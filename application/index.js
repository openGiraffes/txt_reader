$(function () {
    document.activeElement.addEventListener('keydown', handleKeydown);

});

function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            nav(-1);
            break;
        case 'ArrowDown':
            nav(1);
            break;
        case 'Q':
        case 'SoftLeft':

            break;
        case 'E':
        case 'SoftRight':

            break;
        case 'Backspace':
            if (confirm("是否退出？"))
                window.close();
            break;
        case 'Enter':
            
            break;
    }
}

var current = 0;
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
    if (targetElement) {
        current = next;
        targetElement.focus();
    }
}
