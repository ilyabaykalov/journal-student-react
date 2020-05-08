import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { host } from '../../components';

library.add(fas);

const Lesson = ({ id, title, homework, lessonMark, homeworkMark, completed, gitLink }) => {
	const [link, setLink] = useState(gitLink);

	const onClick = () => {
		Swal.fire({
			title: 'Домашнее задание',
			html: `<p class='homework-text'>${ homework.replace(/(\d\.)/g, '<br>$1') }</p>
		           <input id='git-link' type='text' class='field' placeholder='Ссылка на Git' value='${ link ? link : '' }'/>`,
			confirmButtonColor: '#42B883',
			confirmButtonText: 'Понятно',
			preConfirm: function () {
				const newGitLink = document.getElementById('git-link').value;
				return {
					newGitLink: newGitLink !== '' ? newGitLink : null,
				};
			}
		}).then(({ value }) => {
			if (value) {
				if (value.newGitLink && value.newGitLink !== link) {
					axios.patch(`http://${ host.ip }:${ host.port }/lessons/link/${ id }`, {
						gitLink: value.newGitLink,
					}).then(() => {
						Swal.fire({
							icon: 'success',
							title: 'Ссылка на git сохранена'
						}).then(() => {
							console.info('Ссылка на git сохранена');
						}).then(() => {
							setLink(value.newGitLink);
						});
					}).catch(error => {
						Swal.fire({
							icon: 'error',
							title: 'Не удалось сохранить ссылку на git'
						}).then(() => {
							console.error('Не удалось сохранить ссылку на git');
							console.error(`Ошибка: ${ error }`);
						});
					});
				}
			}
		});
	};

	return (
		<div key={ id } className={ !homework ? 'lessons__items-row' : 'lessons__items-row clickable' }
		     onClick={ homework && onClick }>
			<div className='titleWithCheckbox'>
				<div className='checkbox'>
					<input id={ `lesson-${ id }` }
					       type='checkbox'
					       checked={ completed }
					       disabled/>
					<label className={ lessonMark && lessonMark >= 4 ? 'good' : 'bad' }
					       htmlFor={ `lesson-${ id }` }>
						{ !lessonMark && <FontAwesomeIcon className='lessons__items-row__complete-button'
						                                  icon='question'/> }
						{ lessonMark && lessonMark >= 4 &&
						<FontAwesomeIcon className='lessons__items-row__complete-button'
						                 icon='check'/> }
						{ lessonMark && lessonMark <= 3 &&
						<FontAwesomeIcon className='lessons__items-row__complete-button'
						                 icon='times'/> }
					</label>
				</div>
				<p className='title'>{ title }
					{ homework &&
					<FontAwesomeIcon
						className={ !homeworkMark ? 'homework-icon' : homeworkMark >= 4 ? 'homework-icon good' : 'homework-icon bad' }
						icon='book'/> }
				</p>
			</div>
			<div className='mark'>
				<p>{ !lessonMark ? 'Нет оценки за урок' : `Оценка за урок: ${ lessonMark }` }</p>
				{ homework &&
				<p>{ (!homeworkMark) ? 'Нет оценки за д/з' : `Оценка за д/з: ${ homeworkMark }` }</p> }
			</div>
		</div>
	);
};

export default Lesson;
