CommentProject.Api = {        /*Initialize all required functions*/
    init: function (e) {
        this.LoadTopics()
        //this.HookEvents()
    },

    Search: function(e){
        e.preventDefault()
        $.get('/api/Comment/Search?' + $("#SearchTopicForm").serialize()).done(function (data) {
            CommentProject.Api.CreateCommentList(data)
        })
    },

    SearchByParam: function(comment){
        //e.preventDefault()
        $("#home-page-wrapper").empty()
        $.get('/api/Comment/Search?topic=' + comment.Topic).done(function (data) {
            CommentProject.Api.CreateCommentList(data)
        })
    },

    CreateCommentList: function(data){
        const ul = document.getElementById("comments")
        $.each(data, function (key, item) {
            const markup = CommentProject.MarkUp.CommentMarkUp(item)
            var li = document.createElement("li")
            li.setAttribute("id", "commentLi" + item.ID)
            li.innerHTML = markup
            ul.appendChild(li)
        })
    },

    /*Post a comment to a comment*/
    Comment: function (data) {
        $.post('/api/post/answer?author=' + $("#nameInput" + data).val() + '&answer=' + $("#commentInput" + data).val() + "&parent=" + data)
    },

    LoadTopics: function () {
        $.getJSON('/api/get/topic').done(function (data) {
            $.each(data, function (key, item) {
                $('<li><a href="" data-id="'+ item.Topic + '" class="topiclink">' + item.Topic + '</a>').appendTo($('#topics'))
            })
        })
    },

    RandomTopic: function(){
        $.get('/api/get/random').done(function(data){
            CommentProject.Api.SearchByParam(data);
        })
    },

    HookEvents: function () {
        //$(".topiclink").click(this.GetClickedTopic)
        $("#postbutton").click(this.PostTopic)
        $("#random").click(this.RandomTopic)
        $("#SearchTopicForm").submit(this.Search)
        $("#topics").on('click', '.topiclink', this.GetClickedTopic)
    },

    GetClickedTopic: function (e) {
        e.preventDefault()
        $("#home-page-wrapper").empty()
        $.get('/api/Comment/Search?topic=' + $(this).data('id')).done(function (data) {
            CommentProject.Api.CreateCommentList(data)
        })
    },

    HandleCommentDropdown: function(parent){
        if ($("#commentLi" + parent).hasClass('active')) {
            $("#commentLi" + parent).removeClass()
            $("#commentLi" + parent).children('ul').remove()
            return; //To prevent it to continue to add list anyways
        }
        else {
            $("#commentLi" + parent).addClass('active')
        }
    },
    /*Get the direct children of given parent ID*/
    GetChildComment: function (parent) {
        CommentProject.Api.HandleCommentDropdown(parent)
        /*If comment already is showing children, return*/
        if (!$("#commentLi" + parent).hasClass('active')) {
            return;
        }
        /*Create a new UL*/
        var childUl = document.createElement("ul");
        document.getElementById("commentLi" + parent).appendChild(childUl);
        /*Recursivley call for children*/
        $.get('/api/get/child?parent=' + parent).done(function (data) {
            $.each(data, function (key, item) {
                var childLi = document.createElement("li")
                childLi.innerHTML = CommentProject.MarkUp.CommentMarkUp(item)
                childLi.setAttribute("id", "commentLi" + item.ID)
                childUl.appendChild(childLi)
            })
        })
    },

    PostTopic: function () {
        $.post('/api/Comment/Post', $("#PostForm").serialize())
    },

    LikeComment: function(ID){
        $.post('/api/post/like?ID=' + ID)
    },
}
