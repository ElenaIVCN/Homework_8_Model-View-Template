class PostDetailsView {
    postsModel = new PostsModel();
    usersModel = new UsersModel();
    commentsModel = new CommentsModel();

    constructor() {
        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);

        // attach event listeners (submit event pentru adaugat comentarii)
        var submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", this.handleCommentFormSubmit);
    }

    getPostId() {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    }

    hidrateHtml(data) {
       data.then(post => {
            const titleElem = document.querySelector('[data-post="tile"]');
            const bodyElem = document.querySelector('[data-post="body"]');

            titleElem.innerText = post.title;
            bodyElem.innerText = post.body;

            this.hidrateAuthor(post);
            this.hidrateComments(post);
       })
    }

    hidrateAuthor(post) {
        // http://jsonplaceholder.typicode.com/users/1
        this.usersModel.getUserById(post.userId).then(user => {
            const authorElem = document.querySelector('[data-post="author"]');

            authorElem.innerText = user.name;
        });
    }

    hidrateComments(post) {
        // http://jsonplaceholder.typicode.com/posts/2/comments
        this.commentsModel.getCommentForPost(post.id).then(comments => {
            const commentsElem = document.querySelector('[data-post="comments"]');

            for (const comment of comments) {
                commentsElem.innerText += comment.body + "\n \n";
            }
        });
    }

    handleCommentFormSubmit() {
        event.preventDefault();

        // logica de add comment
        var commentBody = document.getElementById("comment");

        var commentsModel = new CommentsModel();
        commentsModel.createComment(1, commentBody.value )
        .then(function(jsn) {
            console.log(jsn);
        });
    }
}

new PostDetailsView();