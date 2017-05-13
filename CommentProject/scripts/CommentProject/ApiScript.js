CommentProject = {
    Api: {

        /*ADD COMMENT*/
        addComment: function addComment() {
            $.post('api/Comment/Put', { "": $('#comment').val() });
        },

        /*GET ALL COMMENTS*/
        getAllComments: function () {
            // Send an AJAX request
            $.getJSON('api/Comment')
                .done(function (data) {
                    // On success, 'data' contains a list of products.
                    $.each(data, function (key, item) {
                        // Add a list item for the product.
                        $('<li>', { text: item.Message }).appendTo($('#comments'))
                    })
                })
        }
    }
}