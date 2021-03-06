﻿CommentProject.Topic = {
    Init: function () {
        this.LoadTopics()
        this.HookEvents()
    },

    HookEvents: function () {
        $("#postbutton").click(this.PostTopic)
        $("#random").click(this.RandomTopic)
        $("#SearchTopicForm").submit(this.Search)
        $("#topics").on('click', '.topiclink', this.GetClickedTopic)
        //$('#burger').on('input', this.Autocomplete)
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
            CommentProject.Topic.SearchByParam(data);
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
    },

    //Autocomplete: function () {
    //    var val = $("#burger").val()
    //    console.log(val)
    //    var availableTopics = []
    //    $.getJSON('/api/get/topic').done(function (data) {
    //        $.each(data, function (key, item) {
    //            availableTopics.push(item.Topic)
    //        })
    //    })
    //    CommentProject.Topic.changeInput(val)
    //},

    //changeInput: function(val) {
    //    $('#burger').on('input', function () {

    //    })
    //}
}