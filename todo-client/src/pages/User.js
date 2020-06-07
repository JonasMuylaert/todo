import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ListInfo } from '../components/ListInfo';
const User = () => {
	const [panel, setPanel] = useState('');
	return (
		<div className="user">
			<div className="user__nav">
				<button className="btn btn--big" onClick={() => setPanel('acountInfo')}>
					Account information
				</button>
				<button className="btn btn--big" onClick={() => setPanel('listInfo')}>
					Lists
				</button>
				<button
					className="btn btn--big"
					onClick={() => console.log('comments')}
				>
					Comments
				</button>
			</div>
			<div className="info-container">
				{/* {panel === 'userInfo'? <UserInfo/>: null } */}
				{panel === 'listInfo' ? <ListInfo /> : null}
				{/* {panel === 'commentInfo'? <CommentInfo/>: null } */}
			</div>
		</div>
	);
};

export default User;
