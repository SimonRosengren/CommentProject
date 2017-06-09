CommentProject = {
    Api: {
        /*Initialize all required functions*/
        init: function (e) {
            this.hookevents()
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
            $.post('/api/post/answer?answer=' + $("#commentInput" + data).val() + "&parent=" + data)
        },

        topics: function () {
            $.getJSON('/api/Topic').done(function (data) {
                $.each(data, function (key, item) {
                    $('<li><a href="" data-id="'+ item.Topic + '" class="topiclink">' + item.Topic + '</a>').appendTo($('#topics'))
                })
                CommentProject.Api.hookevents()
            })
        },

        hookevents: function () {
            $(".topiclink").click(this.clicktopics)
            $("#postbutton").click(this.posttopic)
        },

        clicktopics: function (e) {
            e.preventDefault()
            console.log($(this).data('id'))
            $.get('/api/Comment/Search?topic=' + $(this).data('id')).done(function (data) {
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
        },

        posttopic: function () {
            $.post('/api/Comment/Post', $("#PostForm").serialize())
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
                                                            <form>
                                <input id ="commentInput${item.ID}" name="answer" type="text" placeholder="comment..." />
                            </form>
                                <span class ="comment" onclick="CommentProject.Api.Comment('${item.ID}')">Comment</span>
                                <span class ="comment" onclick="CommentProject.Api.Comment('${item.ID}')">V</span>
                        </div>
                   </div>
                </div>`
            return markup;
        }
    }
}
$(document).ready(function () {
    CommentProject.Api.init();
    CommentProject.Api.topics();
    //CommentProject.Api.hookevents();
    //CommentProject.Api.clicktopics();
    //CommentProject.Api.posttopic();
    console.log("ready");
})
