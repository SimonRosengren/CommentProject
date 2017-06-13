var CommentProject = {
    Init: function () {
        for (var prop in CommentProject) {
            let child = CommentProject[prop]
            if (typeof child ==='object' && child.hasOwnProperty('Init')) {
                child.Init()
            }
        }
    },
}

$(document).ready(function () {
    CommentProject.Init()
})