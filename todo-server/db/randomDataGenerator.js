const faker = require('faker');
const bcrypt = require('bcrypt');

const createRandomUsers = async amount => {
	const res = [];
	for (let i = 0; i <= amount; i++) {
		res.push({
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			email: faker.internet.email(),
			password: await bcrypt.hash(faker.internet.password(), 12),
		});
	}
	console.log(res);
	return res;
};

const createRandomLists = ({ amount, maxUserId }) => {
	const res = [];
	for (let i = 0; i <= amount; i++) {
		res.push({
			name: faker.random.word().split(' ')[0],
			user_id: Math.ceil(Math.random() * maxUserId),
		});
	}
	console.log(res);
	return res;
};
const createRandomTodos = ({ amount, maxListId, maxUserId }) => {
	const res = [];
	for (let i = 0; i <= amount; i++) {
		res.push({
			user_id: Math.ceil(Math.random() * maxUserId),
			title: faker.lorem.sentence(2),
			date_todo: faker.date.between(new Date(), new Date()),
			urgency: faker.random.word().split(' ')[0],
			description: faker.lorem.paragraph(),
			done: Math.round(Math.random() * 2),
			list_id: Math.ceil(Math.random() * maxListId),
		});
	}
	console.log(res);
	return res;
};

const createRandomComments = ({ amount, maxTodoId, maxUserId }) => {
	const res = [];
	for (let i = 0; i <= amount; i++) {
		res.push({
			todo_id: Math.ceil(Math.random() * maxTodoId),
			content: faker.lorem.paragraph(),
			likes: Math.ceil(Math.random() * 10),
			dislikes: Math.ceil(Math.random() * 10),
			user_id: Math.ceil(Math.random() * maxUserId),
		});
	}
	console.log(res);
	return res;
};

const testFunc = async () => {
	await createRandomUsers(5); // eerst user nodig -> AWAIT!!!
	createRandomLists({
		amount: 5,
		maxUserId: 20,
	});
	createRandomTodos({
		amount: 10,
		maxListId: 5,
		maxUserId: 5,
	});
	createRandomComments({
		amount: 10,
		maxTodoId: 10,
		maxUserId: 5,
	});
};

// testFunc(); Testen vooraleer in DB te seeden! (volgorde)

module.exports = {
	createRandomUsers,
	createRandomLists,
	createRandomTodos,
	createRandomComments,
};
