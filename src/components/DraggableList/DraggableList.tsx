import { FC, useState } from 'react';
import styled from 'styled-components';
import DraggableListItem from './DraggableListItem';

import { DragDropContext, DropResult} from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import DragForm from './DragForm';

import { useSelector } from 'react-redux';
import { Spacecraft } from '../../pages/Spacecrafts/Spacecrafts';
import { RootState } from '../../store';

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
  const spacecrafts = useSelector(
		(state: RootState) => state.spacecrafts.spacecrafts
	);

  const [list, setList] = useState<Spacecraft[]>(spacecrafts);

  const addToListHandler = (item: {title: string}) => {
    // setList(prevList => [item, ...prevList])
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
						{list.map((item: Spacecraft, index: number) => (
							<DraggableListItem key={index} title={item.name} index={index}/>
						))}
            {provided.placeholder}
					</List>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DraggableList;
