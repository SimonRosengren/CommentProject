CommentProject = {
    Api: {
        /*Initialize all required functions*/
        init: function (e) {
            $("#PostForm").submit(function () {
                $.post('/api/Comment/Post', $("#PostForm").serialize())
            })
            $("#SearchTopicForm").submit(function (e) {
                e.preventDefault()
                $.get('/api/Comment/Search?' + $("#SearchTopicForm").serialize()).done(function (data) {
                    const ul = document.getElementById("comments")
                    $.each(data, function (key, item) {
                        const markup = CommentProject.Api.CommentMarkUp(item)
                        var li = document.createElement("li")
                        li.innerHTML = markup
                        ul.appendChild(li)
                        /*Create a new UL*/
                        var childUl = document.createElement("ul")
                        li.appendChild(childUl);
                        /*Recursivley call for children*/
                        $.get('/api/get/child?parent=' + item.ID).done(function (data) {
                            $.each(data, function (key, item) {
                                var childLi = document.createElement("li")
                                childLi.innerHTML = CommentProject.Api.CommentMarkUp(item)
                                childUl.appendChild(childLi)
                            })
                        })
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
        },

        /*Post a comment to a comment*/
        Comment: function (data) {
            $.post('/api/post/answer?answer=' + $("#commentInput").val() + "&parent=" + data)
        },

        topics: function () {
            $.getJSON('/api/Topic').done(function (data) {
                $.each(data, function (key, item) {
                    $('<li><a href="" id="topiclink">' + item.Topic + '</a>').appendTo($('#topics'))
                })
            })
        },

        clicktopics: function (e) {
            console.log($("#topiclink"))
            $("#topiclink").click(function (e) {
                //e.preventDefault();
                $.get('/api/Comment/Search?' + $("#SearchTopicForm").serialize()).done(function (data) {
                    $.each(data, function (key, item) {
                        $('<li>', { text: item.Topic }).appendTo($('#selectedtopic'))
                    })
                })
            })
        },

        /*Returns the Comment Mark up*/
        CommentMarkUp: function (item) {
            const markup =
                `<div class="container">
                    <div class="dialogbox">
                        <div class="body">
                            <span class="author">${item.Author}</span>
                            <span class="tip tip-up"></span>
                                <div class="message">
                                    <span>${item.Message}</span>
                                </div>
                                <span class="comment" onclick="CommentProject.Api.Comment('${item.ID}')">Comment</span>
                        </div>
                        <form>
                            <input id ="commentInput" name="answer" type="text" placeholder="comment..." />
                        </form>
                   </div>
                </div>`
            return markup;
        }
    }
}
$(document).ready(function () {
    CommentProject.Api.init();
    CommentProject.Api.topics();
    CommentProject.Api.clicktopics();
    console.log("ready");
})
