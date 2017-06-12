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
                        li.setAttribute("id", "commentLi" + item.ID)
                        li.innerHTML = markup
                        ul.appendChild(li)
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

        SearchByParam: function(comment){
            e.preventDefault()
            $("#home-page-wrapper").empty()
            $.get('/api/Comment/Search?' + comment.Topic).done(function (data) {
                const ul = document.getElementById("comments")
                $.each(data, function (key, item) {
                    const markup = CommentProject.Api.CommentMarkUp(item)
                    var li = document.createElement("li")
                    li.setAttribute("id", "commentLi" + item.ID)
                    li.innerHTML = markup
                    ul.appendChild(li)
                })
            })
        },

        /*Post a comment to a comment*/
        Comment: function (data) {
            $.post('/api/post/answer?author=' + $("#nameInput" + data).val() + '&answer=' + $("#commentInput" + data).val() + "&parent=" + data)
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
            $("#home-page-wrapper").empty()
            $.get('/api/Comment/Search?topic=' + $(this).data('id')).done(function (data) {
                const ul = document.getElementById("comments")
                $.each(data, function (key, item) {
                    const markup = CommentProject.Api.CommentMarkUp(item)
                    var li = document.createElement("li")
                    li.setAttribute("id", "commentLi" + item.ID)
                    li.innerHTML = markup
                    ul.appendChild(li)
                })
            })
            console.log($(this).data('id'))
        },
        /*Get the direct children of given parent ID*/
        GetChildComment: function (parent) {
            if ($("#commentLi" + parent).hasClass('active')) {
                $("#commentLi" + parent).removeClass()
                $("#commentLi" + parent).children('ul').remove()
                return; //To prevent it to continue to add list anyways
            }
            else {
                $("#commentLi" + parent).addClass('active')
            }
            /*Create a new UL*/
            var childUl = document.createElement("ul");
            document.getElementById("commentLi" + parent).appendChild(childUl);
            /*Recursivley call for children*/
            $.get('/api/get/child?parent=' + parent).done(function (data) {
                $.each(data, function (key, item) {
                    var childLi = document.createElement("li")
                    childLi.innerHTML = CommentProject.Api.CommentMarkUp(item)
                    childLi.setAttribute("id", "commentLi" + item.ID)
                    childUl.appendChild(childLi)
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
                                <input id ="nameInput${item.ID}" name="author" type="text" placeholder="name" />
                                <input id ="commentInput${item.ID}" name="answer" type="text" placeholder="comment..." />
                            </form>
                                <span class ="comment" onclick="CommentProject.Api.Comment('${item.ID}')">Comment</span>
                                <span class ="comment" onclick="CommentProject.Api.GetChildComment('${item.ID}')">V</span>
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
