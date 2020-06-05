import axios from 'axios';
class Auth {
	url = 'http://localhost:5000/auth/';

	async login(user) {
		const res = await axios({
			method: 'POST',
			url: this.url.concat('login'),
			data: user,
		});

		return res;
	}

	async signUp(user) {
		const res = await axios({
			method: 'POST',
			url: this.url.concat('signup'),
			data: user,
		});

		return res;
	}
}

export default new Auth();
