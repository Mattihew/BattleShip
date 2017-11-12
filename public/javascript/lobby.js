$(document).ready(function()
{
    $("tr[data-id]").click(function()
    {
        var url = '/play?l=' + $(this).attr('data-id');
        $(location).attr('href', url);
    })
});