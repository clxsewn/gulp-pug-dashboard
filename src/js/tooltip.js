$(function() {
    $("aside nav .nav-item").tooltip({
        show: {
            effect: 'fade',
            delay: 0,
        },
        position: {
            my: "left top",
            at: "right+15 top",
            collision: "none"
        }
    });
});