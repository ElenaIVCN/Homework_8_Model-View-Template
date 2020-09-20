//MVC Model View Controller
class UsersModel {
    apiUrl = 'http://jsonplaceholder.typicode.com/users';

    getUserById(id) {
        return this.getApiData(id);
    }

    getApiData(id, options) {
        return fetch(this.apiUrl + (id ? `/${id}` : ''), options)
                    .then(res => res.json());
    }
}
