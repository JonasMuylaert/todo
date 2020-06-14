import React, { Fragment, useEffect, useContext, useState } from 'react';
import TodoContext from '../context/todo/todoContext';

import ApiHelper from '../util/ApiHelper';
import { Comment } from './Comment';
//custom hooks
import { useForm } from '../hooks/useForm';

export const Comments = ({ todoId }) => {
	const [handleChange, handleSubmit, values] = useForm(submit);
	const todoContext = useContext(TodoContext);
	const { setLoading, setError } = todoContext;
	const [comments, setComments] = useState([]);

	const getComments = async () => {
		setError(null);
		try {
			setLoading(true);
			const res = await ApiHelper.getComments(todoId);
			setComments(res.data.comments);
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};
	const getUser = async () => {
		try {
			const user = await ApiHelper.getUserById();
		} catch (error) {
			setError(error.response);
		}
	};
	async function submit() {
		setError(null);
		try {
			setLoading(true);
			const res = await ApiHelper.addComment(todoId, values);
			getComments();
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getComments();
	}, []);
	return (
		<Fragment>
			<form className="comment__form" onSubmit={handleSubmit}>
				<div className="form__section form__section--description">
					<textarea
						name="content"
						onChange={handleChange}
						value={values.content ? values.content : ''}
						id="content"
						maxLength="255"
						className="form__input form__input--text-area"
						placeholder="Insert comment"
						cols={50}
					></textarea>
					<label
						forhtml="content"
						className="form__label form__label--text"
					></label>
				</div>
				<button className="btn btn--green">Add comment</button>
			</form>
			<div className="comments">
				{comments.length >= 1 &&
					comments.map((comment, index) => (
						<Comment
							todoId={todoId}
							key={index}
							commentId={comment.id}
							content={comment.content}
							author={comment.user_id}
							likes={comment.likes}
							dislikes={comment.dislikes}
							fetchComments={getComments}
						/>
					))}
			</div>
		</Fragment>
	);
};
