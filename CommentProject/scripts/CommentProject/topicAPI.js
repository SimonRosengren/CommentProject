CommentProject.Topic = {
    Init: function () {
        this.LoadTopics()
    },

    PostTopic: function () {
        $.post('/api/Comment/Post', $("#PostForm").serialize())
    },

    LoadTopics: function () {
        $.getJSON('/api/get/topic').done(function (data) {
            $.each(data, function (key, item) {
                $('<li><a href="" data-id="' + item.Topic + '" class="topiclink">' + item.Topic + '</a>').appendTo($('#topics'))
            })
        })
    },

    RandomTopic: function () {
        $.get('/api/get/random').done(function (data) {
            CommentProject.Comment.SearchByParam(data);
        })
    },

    GetClickedTopic: function (e) {
        e.preventDefault()
        $("#home-page-wrapper").empty()
        $.get('/api/Comment/Search?topic=' + $(this).data('id')).done(function (data) {
            CommentProject.Comment.CreateCommentList(data)
        })
    },

    Search: function (e) {
        e.preventDefault()
        $.get('/api/Comment/Search?' + $("#SearchTopicForm").serialize()).done(function (data) {
            CommentProject.Comment.CreateCommentList(data)
        })
    },

    SearchByParam: function (comment) {
        //e.preventDefault()
        $("#home-page-wrapper").empty()
        $.get('/api/Comment/Search?topic=' + comment.Topic).done(function (data) {
            CommentProject.Comment.CreateCommentList(data)
        })
    }
}