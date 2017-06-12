CommentProject = {

    init: function (e) {
        this.LoadTopics()
        this.HookEvents()
    },
}


$(document).ready(function () {
    CommentProject.Api.init();
})