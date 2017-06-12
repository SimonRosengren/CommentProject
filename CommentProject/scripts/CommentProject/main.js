var CommentProject = {
    Init: function () {
        CommentProject.Api.init()
        this.HookEvents()
    },

    HookEvents: function () {
        //$(".topiclink").click(this.GetClickedTopic)
        $("#postbutton").click(CommentProject.Api.PostTopic)
        $("#random").click(CommentProject.Api.RandomTopic)
        $("#SearchTopicForm").submit(CommentProject.Api.Search)
        $("#topics").on('click', '.topiclink', CommentProject.Api.GetClickedTopic)
    }
}


$(document).ready(function () {
    CommentProject.Init()
})