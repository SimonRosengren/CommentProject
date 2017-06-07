CommentProject = {
    Api: {
        init: function (e) {
            $("#PostForm").submit(function () {
                $.post('/api/Comment/Post', $("#PostForm").serialize())
            })

            $("#SearchTopicForm").submit(function (e) {
                e.preventDefault()
                $.get('/api/Comment/Search?' + $("#SearchTopicForm").serialize()).done(function (data) {
                    $.each(data, function (key, item) {
                        const markup =
                         `<div class="container">
                            <div class="dialogbox">
                                <div class="body">
                                    <span class="author">${item.Author}</span>
                                    <span class="tip tip-up"></span>
                                    <div class="message">
                                        <span>${item.Message}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        document.getElementById("comments").innerHTML = markup;
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