import { FC } from "react";
import styled from "styled-components";

import { Draggable } from 'react-beautiful-dnd';
import { Colors } from "../../styledHelpers/Colors";
import { FaSatellite } from 'react-icons/fa';

const Item = styled.li`
  background-color: ${Colors.mainThemeColor};
  width: 50%;
  border-radius: 15px;
  padding: 10px 0px;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  & > svg {
    font-size: 20px;
    margin-left: 10px;
  }

  & > p {
    margin: 0;
  }
`;

export interface IItem {
  title: string,
  index: number;
}

const DraggableListItem: FC<IItem> = (props) => {
  return (
    <Draggable draggableId={"draggable-" + props.index} index={props.index}>
      {(provided, snapshot) => (
        <Item  
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          style={{...provided.draggableProps.style,
          boxShadow: snapshot.isDragging ? "rgb(0, 0, 0) 0px 20px 30px -10px" : "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} 
        >
          <FaSatellite/>
          <p>{props.title}</p>
        </Item>
      )}
    </Draggable>
  )
};

export default DraggableListItem;