import axios from 'axios';
class ApiHelper {
	url = `http://localhost:5000/api/`;

	async getTodos(query) {
		try {
			const res = await axios({
				method: 'GET',
				url: this.url.concat('todos/'),
				params: query,
			});
			return res;
		} catch (error) {
			throw Error(error);
		}
	}
	async getTodo(id) {
		try {
			const res = await axios({
				method: 'GET',
				url: this.url.concat(`todos/${id}`),
			});

			return res;
		} catch (error) {
			throw Error(error);
		}
	}
	async deleteTodo(id) {
		try {
			const res = axios({
				method: 'DELETE',
				url: this.url.concat(`todos/delete/${id}`),
				headers: { Authorization: localStorage.Authorization },
			});
			return res;
		} catch (error) {
			throw Error(error);
		}
	}
	async addTodo(todo) {
		try {
			const res = await axios({
				method: 'POST',
				url: this.url.concat('todos/add'),
				data: todo,
				headers: { Authorization: localStorage.Authorization },
			});

			return res;
		} catch (error) {
			throw Error(error);
		}
	}
	async updateTodo(id, todo) {
		try {
			const res = await axios({
				method: 'PUT',
				url: this.url.concat(`todos/update/${id}`),
				data: todo,
				headers: { Authorization: localStorage.Authorization },
			});
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	async getLists() {
		try {
			const res = await axios({
				method: 'GET',
				url: this.url.concat('lists/'),
				headers: { Authorization: localStorage.Authorization },
			});
			return res;
		} catch (error) {
			throw Error(error);
		}
	}
}
export default new ApiHelper();
