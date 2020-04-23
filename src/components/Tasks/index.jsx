import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Task, AddTaskForm, host } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty }) => {
	const editTitle = () => {
		const newTitle = window.prompt('Название списка', list.name);
		if (newTitle) {
			onEditTitle(list.id, newTitle);
			axios.patch(`http://${ host.ip }:${ host.port }/lists/${ list.id }`, {
				name: newTitle
			}).then(() => {
				console.debug(`Заголовок текущего списка изменён на ${ newTitle }`);
			}).catch(error => {
				console.error('Не удалось обновить название списка');
				console.error(`Ошибка: ${ error }`);
				alert('Не удалось обновить название списка');
			});
		}
	};

	return (
		<div className='tasks'>
			<Link to={ `/lists/${ list.id }` }>
				<div className='tasks__header'>
					<h2 className='tasks__header__title' style={ { color: list.color.hex } }>
						{ list.name }
					</h2>
					<FontAwesomeIcon className='tasks__header__list-name-edit-button'
					                 icon='pen'
					                 onClick={ editTitle }/>
				</div>
			</Link>

			<div className='tasks__items'>
				{ list.tasks &&
				list.tasks.map(task => (
					<Task
						key={ task.id }
						list={ list }
						onEdit={ onEditTask }
						onRemove={ onRemoveTask }
						onComplete={ onCompleteTask }
						{ ...task }/>
				)) }
				<AddTaskForm key={ list.id } list={ list } onAddTask={ onAddTask }/>
				{ !withoutEmpty && list.tasks && !list.tasks.length && (
					<h2 className='no-tasks'>Задачи отсутствуют</h2>
				) }
			</div>
		</div>
	);
};

export default Tasks;
