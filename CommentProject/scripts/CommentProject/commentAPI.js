CommentProject.Comment = {

    Comment: function (data) {
        $.post('/api/post/answer?author=' + $("#nameInput" + data).val() + '&answer=' + $("#commentInput" + data).val() + "&parent=" + data)
    },

    CreateCommentList: function (data) {
        const ul = document.getElementById("comments")
        $.each(data, function (key, item) {
            const markup = CommentProject.MarkUp.CommentMarkUp(item)
            var li = document.createElement("li")
            li.setAttribute("id", "commentLi" + item.ID)
            li.innerHTML = markup
            ul.appendChild(li)
        })
    },

    HandleCommentDropdown: function (parent) {
        if ($("#commentLi" + parent).hasClass('active')) {
            $("#commentLi" + parent).removeClass()
            $("#commentLi" + parent).children('ul').remove()
            return; //To prevent it to continue to add list anyways
        }
        else {
            $("#commentLi" + parent).addClass('active')
        }
    },

    GetChildComment: function (parent) {
        CommentProject.Comment.HandleCommentDropdown(parent)
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

    LikeComment: function (ID) {
        $.post('/api/post/like?ID=' + ID)
    },

}