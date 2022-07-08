$('#add-new-post').on('click', function () {
    $('.hideform').show();
    $(this).hide();
})

$('#close').on('click', function () {
    $('.hideform').hide();
    $('#add-new-post').show();
})

$(".add-comment").on('click', () => {
    $('.hidecommentform').show();
    $('.add-comment').hide();
})

$(".close-comment").on('click', () => {
    $('.hidecommentform').hide();
    $('.add-comment').show();
})