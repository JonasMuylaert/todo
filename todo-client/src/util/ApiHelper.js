import axios from 'axios';
class ApiHelper {
	url = `http://localhost:5000/api/`;

	async getTodos(query) {
		const res = await axios({
			method: 'GET',
			url: this.url.concat('todos/'),
			params: query,
		});
		return res;
	}
	async getTodo(id) {
		const res = await axios({
			method: 'GET',
			url: this.url.concat(`todos/${id}`),
		});

		return res;
	}
	async deleteTodo(id) {
		const res = axios({
			method: 'DELETE',
			url: this.url.concat(`todos/delete/${id}`),
			headers: { Authorization: localStorage.Authorization },
		});
		return res;
	}
	async addTodo(todo) {
		const res = await axios({
			method: 'POST',
			url: this.url.concat('todos/add'),
			data: todo,
			headers: { Authorization: localStorage.Authorization },
		});

		return res;
	}
	async updateTodo(id, todo) {
		const res = await axios({
			method: 'PUT',
			url: this.url.concat(`todos/update/${id}`),
			data: todo,
			headers: { Authorization: localStorage.Authorization },
		});
		return res;
	}

	async getLists() {
		const res = await axios({
			method: 'GET',
			url: this.url.concat('lists/'),
			headers: { Authorization: localStorage.Authorization },
		});
		return res;
	}

	async addList(data) {
		const res = await axios({
			method: 'POST',
			url: this.url.concat('lists/'),
			headers: { Authorization: localStorage.Authorization },
			data: data,
		});
		return res;
	}

	async deleteList(listId) {
		const res = await axios({
			method: 'DELETE',
			url: this.url.concat('lists/'),
			headers: { Authorization: localStorage.Authorization },
			params: { id: listId },
		});
		return res;
	}

	async getComments(todoId) {
		const res = await axios({
			method: 'GET',
			url: this.url.concat(`comments/${todoId}`),
			headers: { Authorization: localStorage.Authorization },
		});
		return res;
	}

	async addComment(todoId, content) {
		const res = await axios({
			method: 'POST',
			url: this.url.concat(`comments/${todoId}`),
			headers: { Authorization: localStorage.Authorization },
			data: content,
		});
		return res;
	}
	async updateComment(todoId, commentId, type) {
		let data;
		if (type === 'like') {
			data = {
				likes: 1,
				dislikes: 0,
			};
		} else if (type === 'dislike') {
			data = {
				dislikes: 1,
				likes: 0,
			};
		} else if (type === 'even') {
			data = {
				dislikes: 0,
				likes: 0,
			};
		}
		const send = {
			commentId,
			data,
		};
		const res = await axios({
			method: 'PUT',
			url: this.url.concat(`comments/${todoId}`),
			headers: { Authorization: localStorage.Authorization },
			data: send,
		});
		return res;
	}
	async getUserById() {
		const res = await axios({
			method: 'GET',
			headers: { Authorization: localStorage.Authorization },
		});
		return res;
	}
}
export default new ApiHelper();
