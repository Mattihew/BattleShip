$(document).ready(function()
{
    $("button[data-action='delete']").click(function()
    {
        var button = $(this);
        $.ajax('/lobbys/' + button.attr('data-id'),
        {
            type: 'DELETE',
            success: function(result, status)
            {
                button.parents('tr').remove();
            }
        });
    });
});