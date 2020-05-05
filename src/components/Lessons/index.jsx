import React from 'react';
import { Link } from 'react-router-dom';

import { Lesson } from '../../components';

import './Lessons.scss';

const Lessons = ({ chapter }) => {
	return (
		<div className='lessons'>
			<Link to={ `/chapters/${ chapter.id }` }>
				<div className='lessons__header'>
					<h2 className='lessons__header__title' style={ { color: chapter.color.hex } }>
						{ chapter.name }
					</h2>
				</div>
			</Link>

			<div className='lessons__items'>
				{ chapter.lessons &&
				chapter.lessons.map(lesson => (
					<Lesson
						key={ lesson.id }
						chapter={ chapter }
						{ ...lesson }/>
				)) }
			</div>
		</div>
	);
};

export default Lessons;
