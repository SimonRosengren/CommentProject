CommentProject.MarkUp = {

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
                                <span class ="like" onclick="CommentProject.Api.LikeComment('${item.ID}')">Like</span>
                                <span class ="likeOutput">${item.Likes}</span>
                        </div>
                   </div>
                </div>`
        return markup;
    }
}