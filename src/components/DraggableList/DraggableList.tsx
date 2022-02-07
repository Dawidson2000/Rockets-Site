import { FC, useState } from 'react';
import styled from 'styled-components';
import DraggableListItem from './DraggableListItem';

import { DragDropContext, DropResult} from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import DragForm from './DragForm';

export const DUMMY_DATA = [
	{
		title: '1 element',
	},
	{
		title: '2 element',
	},
	{
		title: '3 element',
	},
	{
		title: '4 element',
	},
	{
		title: '5 element',
	},
  {
		title: '6 element',
	},
	{
		title: '7 element',
	},
	{
		title: '8 element',
	},
	{
		title: '9 element',
	},
	{
		title: '10 element',
	},
];

const List = styled.ul`
	list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #152238;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 15px;
`;

const DraggableList: FC = () => {
  const [list, setList] = useState<{title: string}[]>(DUMMY_DATA);

  const addToListHandler = (item: {title: string}) => {
    setList(prevList => [item, ...prevList])
  };

  const onDragEnd = (param: DropResult) => {
    const srcIndex = param.source.index;
    const desIndex = param.destination?.index;
  
    let existedList = [...list]; 
   
    if(desIndex != null){ 
      console.log("yez")
      let srcElement = existedList[srcIndex];
      existedList.splice(srcIndex, 1);
      existedList.splice(desIndex, 0, srcElement);
    }
    
    setList(existedList);
  };

	return (
		<DragDropContext onDragEnd={(param) => onDragEnd(param)}>
			<Droppable droppableId='droppable-1'>
				{(provided) => (
					<List ref={provided.innerRef} {...provided.droppableProps}>
            <DragForm onAddToList={addToListHandler}/>
						{list.map((item: any, index: number) => (
							<DraggableListItem key={index} title={item.title} index={index}/>
						))}
            {provided.placeholder}
					</List>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DraggableList;
