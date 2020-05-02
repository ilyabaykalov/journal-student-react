import React from 'react';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Lesson = ({ id, title, homework, lessonMark, homeworkMark, completed }) => {
	const onClick = () => {
		Swal.fire({
			title: 'Домашнее задание',
			text: homework,
			confirmButtonColor: '#42B883',
			confirmButtonText: 'Понятно',
		});
	};

	return (
		<div key={ id } className={ homework === 'none' ? 'lessons__items-row' : 'lessons__items-row clickable' }
		     onClick = { homework !== 'none' && onClick }>
			<div className='titleWithCheckbox'>
				<div className='checkbox'>
					<input id={ `lesson-${ id }` }
					       type='checkbox'
					       checked={ completed }
					       disabled/>
					<label className={ lessonMark === 'none' ? '' : lessonMark >= 4 ? 'good' : 'bad' }
					       htmlFor={ `lesson-${ id }` }>
						{ lessonMark === 'none' && <FontAwesomeIcon className='lessons__items-row__complete-button'
						                                            icon='question'/> }
						{ lessonMark >= 4 && <FontAwesomeIcon className='lessons__items-row__complete-button'
						                                      icon='check'/> }
						{ lessonMark <= 3 && <FontAwesomeIcon className='lessons__items-row__complete-button'
						                                      icon='times'/> }
					</label>
				</div>
				<p className={ completed ? 'title completed' : 'title' }>{ title }
					{
						homework !== 'none' &&
						<FontAwesomeIcon
							className={ homeworkMark === 'none' ? 'homework-icon' : homeworkMark >= 4 ? 'homework-icon good' : 'homework-icon bad' }
							icon='book'/>
					}
				</p>
			</div>
			<div className='mark'>
				<p>{ !lessonMark || lessonMark === 'none' ? 'Нет оценки за урок' : `Оценка за урок: ${ lessonMark }` }</p>
				{ homework !== 'none' &&
				<p>{ (!homeworkMark || homeworkMark === 'none') ? 'Нет оценки за д/з' : `Оценка за д/з: ${ homeworkMark }` }</p> }
			</div>
		</div>
	);
};

export default Lesson;
