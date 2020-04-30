import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Badge } from '../../components';

import './Сhapter.scss';

library.add(fas);

const Chapter = ({ items, onClick, onClickItem, activeItem }) => {
	return (
		<ul className='chapter' onClick={ onClick }>
			{ items.map((item, index) => (
				<li key={ index }
				    className={ classNames(item.className, {
					    active: item.active
						    ? item.active
						    : activeItem && activeItem.id === item.id
				    }) }
				    onClick={ onClickItem ? () => onClickItem(item) : null }>
					{ item.icon ?
						<FontAwesomeIcon className={ 'icon' }
						                 icon={ item.icon }/> :
						<Badge color={ item.color.name }/>
					}
					<span>
						{ item.name }
						{ item.lessons && ` (${ item.lessons.filter(lesson => lesson.completed).length }/${ item.lessons.length })` }
					</span>
				</li>
			)) }
		</ul>
	);
};

export default Chapter;
