import React, { useContext } from 'react';
import TodoContext from '../context/todo/todoContext';
import ApiHelper from '../util/ApiHelper';

export const Comment = ({
	todoId,
	content,
	author,
	likes,
	dislikes,
	commentId,
	fetchComments,
}) => {
	const todoContext = useContext(TodoContext);
	const { setLoading, setError } = todoContext;
	const likeDislike = async type => {
		setError(null);
		try {
			setLoading(true);
			const res = await ApiHelper.updateComment(todoId, commentId, type);
			fetchComments();
		} catch (error) {
			setError(error.response);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="comments__comment">
			<div className="comments__info">
				<span className="comments__info--author">{author}</span>
				<div className="comments__info--likes">
					<span
						className="likes--img"
						name="like"
						style={{ cursor: 'pointer' }}
						onClick={() => (likes ? likeDislike('even') : likeDislike('like'))}
					>
						<i className="far fa-thumbs-up"></i>
					</span>
					<span className="likes--number">{likes}</span>
				</div>
				<div className="comments__info--dislikes">
					<span
						className="likes--img"
						name="dislike"
						style={{ cursor: 'pointer' }}
						onClick={() =>
							dislikes ? likeDislike('even') : likeDislike('dislike')
						}
					>
						<i className="far fa-thumbs-down"></i>
					</span>
					<span className="likes--number">{dislikes}</span>
				</div>
			</div>
			<div className="comments__comment--content">{content}</div>
		</div>
	);
};
