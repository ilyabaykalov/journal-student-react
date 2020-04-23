import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { host } from '../../components';

library.add(fas);

const AddTaskForm = ({ list, onAddTask }) => {
	const [visibleForm, setFormVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const toggleFormVisible = () => {
		setFormVisible(!visibleForm);
		setInputValue('');
	};

	const addTask = () => {
		const newTask = {
			listId: list.id,
			text: inputValue.capitalize(),
			completed: false
		};
		setIsLoading(true);
		axios.post(`http://${ host.ip }:${ host.port }/tasks`, newTask).then(({ data }) => {
			onAddTask(list.id, data);
			toggleFormVisible();
		}).then(() => {
			console.debug(`Задача '${ inputValue }' успешно добавлена`);
		}).catch(error => {
			console.error('Ошибка при добавлении задачи');
			console.error(`Ошибка: ${ error }`);
			alert('Ошибка при добавлении задачи');
		}).finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className='tasks__form'>
			{ !visibleForm ? (
				<div className='tasks__form-new' onClick={ toggleFormVisible }>
					<FontAwesomeIcon className='icon'
					                 icon={ 'plus' }/>
					<span>Новая задача</span>
				</div>
			) : (
				<div className='tasks__form-block'>
					<input className='field'
					       type='text' autoFocus
					       placeholder='Текст задачи'
					       value={ inputValue }
					       onChange={ e => setInputValue(e.target.value) }/>
					<button disabled={ isLoading } onClick={ addTask } className='button'>
						{ isLoading ? 'Добавление...' : 'Добавить задачу' }
					</button>
					<button className='button button--grey' onClick={ toggleFormVisible }>
						Отмена
					</button>
				</div>
			) }
		</div>
	);
};

export default AddTaskForm;
