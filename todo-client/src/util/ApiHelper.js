import axios from 'axios';
export class ApiHelper {
	url = `http://localhost:5000/api/v1/`;
	constructor(context) {
		this.context = context;
	}
	async makeGetRequest(id, page) {
		const { setLoading, setError, setTodos } = this.context;
		setLoading(true);
		setError(false);
		const res = axios({
			method: 'GET',
			url: id ? this.url.concat(id) : this.url,
			params: page ? { page: page, limit: 10 } : null,
		})
			.then(res => {
				setTodos(res.data);
				setLoading(false);
				return res;
			})
			.catch(err => {
				console.log(err);
				setError(true);
			});
		return res;
	}
	async makePostRequest(axiosObj) {
		const { setLoading, setError } = this.context;
		setLoading(true);
		setError(false);
		const res = axios(axiosObj)
			.then(res => {
				console.log(res);
				setLoading(false);
				return res;
			})
			.catch(err => {
				console.log(err);
				setError(true);
			});
		return res;
	}
	async getTodos(page) {
		const res = await this.makeGetRequest(null, page);
		return res;
	}
	async getTodo(id) {
		// const res = await axios.get(this.url + id);
		const res = await this.makeGetRequest(id, null);

		return res;
	}
	async deleteTodo(id) {
		const res = await this.makePostRequest({
			method: 'DELETE',
			url: this.url.concat(`delete/${id}`),
		});
		return res;
	}
	async addTodo(todo) {
		const res = await this.makePostRequest({
			method: 'POST',
			url: this.url.concat('add'),
			data: todo,
		});
		return res;
	}
	async editTodo(id, todo) {
		const res = await this.makePostRequest({
			method: 'PUT',
			url: this.url.concat(`update/${id}`),
			data: todo,
		});

		return res;
	}

	async setDone(id, done) {
		let par;
		if (done) {
			par = 0;
		} else {
			par = 1;
		}
		const res = await this.makePostRequest({
			method: 'PUT',
			url: this.url.concat(`done/${id}`),
			params: { done: par },
		});

		return res;
	}
}
