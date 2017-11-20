$(document).ready(function()
{
    $("tr[data-id]").click(function()
    {
        var url = '/play/' + $(this).attr('data-id');
        $(location).attr('href', url);
    })
});