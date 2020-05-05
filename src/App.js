import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Chapter, host, Lessons } from './components';

library.add(fas);

function App() {
	const [chapters, updateChapters] = useState(null);
	const [activeItem, setActiveItem] = useState(null);
	let history = useHistory();

	useEffect(() => {
		axios.get(`http://${ host.ip }:${ host.port }/api/chapters`).then(({ data }) => {
			updateChapters(data);
		}).then(() => {
			console.debug(`Главы успешно получены с сервера`);
		}).catch(error => {
			console.error('Не удалось получить главы с сервера');
			console.error(`Ошибка: ${ error }`);
			alert('Не удалось получить главы с сервера');
		});
	}, []);

	useEffect(() => {
		const chapterId = Number(history.location.pathname.replace('/chapters/', ''));
		if (chapters) {
			const chapter = chapters.find(chapter => chapter.id === chapterId);
			setActiveItem(chapter);
		}
	}, [chapters, history.location.pathname]);

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<Chapter onClickItem={ () => {
					history.push(`/`);
				} } items={ [{
					active: history.location.pathname === '/',
					icon: 'list',
					name: 'Все главы'
				}] }/>
				{ chapters ? (
					<Chapter items={ chapters }
					         onRemove={ id => {
						         const newChapters = chapters.filter(item => item.id !== id);
						         setActiveItem(chapters.find(item => item.id === id));
						         updateChapters(newChapters);
					         } }
					         onClickItem={ chapter => {
						         history.push(`/chapters/${ chapter.id }`);
					         } }
					         activeItem={ activeItem }
					         isRemovable/>
				) : (
					<div className='loading'>
						<FontAwesomeIcon className={ 'icon fa-spin' }
						                 icon='spinner'/>
						<p>Загрузка...</p>
					</div>
				) }
			</div>
			<div className='todo__lessons'>
				<Route exact path='/'>
					{ chapters && chapters.map(chapter => (
						<Lessons key={ chapter.id }
						         chapter={ chapter }
						         withoutEmpty/>
					)) }
				</Route>
				<Route path='/chapters/:id'>
					{ chapters && activeItem && (
						<Lessons
							chapter={ activeItem }/>
					) }
				</Route>
			</div>
		</div>
	);
}

export default App;
