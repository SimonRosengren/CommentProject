var CommentProject = {
    Init: function () {
        CommentProject.Topic.Init()
        this.HookEvents()
    },

    HookEvents: function () {
        $("#postbutton").click(CommentProject.Topic.PostTopic)
        $("#random").click(CommentProject.Topic.RandomTopic)
        $("#SearchTopicForm").submit(CommentProject.Topic.Search)
        $("#topics").on('click', '.topiclink', CommentProject.Topic.GetClickedTopic)
    }
}


$(document).ready(function () {
    CommentProject.Init()
})