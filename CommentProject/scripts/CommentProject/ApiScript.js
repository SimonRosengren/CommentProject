CommentProject = {
    Api: {
        init: function () {
            $("#PostForm").submit(function () {
                $.post('/api/Comment/Post', $("#PostForm").serialize())
            })

            $("#SearchTopicForm").submit(function () {
                $.get('/api/Comment/Search?' + $("#SearchTopicForm").serialize()).done(function (data) {
                    $.each(data, function (key, item) {
                        // Add a list item for the product.
                        $('<li>', { text: item.Message }).appendTo($('#comments'))
                    })
                })
            })

            $.getJSON('/api/Comment').done(function (data) {
                // On success, 'data' contains a list of products.
                $.each(data, function (key, item) {
                    // Add a list item for the product.
                   // $('<li>', { text: item.Message }).appendTo($('#comments'))
                })
            })
        }
    }
}