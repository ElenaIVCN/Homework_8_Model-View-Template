//MVC Model View Controller
class CommentsModel {
    apiUrl = 'http://jsonplaceholder.typicode.com/posts';

    getCommentForPost(id) {
        return this.getApiData(id);
    }

    createComment(userId, commentBody) {
        const comment = {
            commentBody
        };

        return this.getApiData(userId, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(comment)
        });
    }

    getApiData(id, options) {
        return fetch(this.apiUrl + (id ? `/${id}` : '') + '/comments', options)
                    .then(res => res.json());
    }
}
