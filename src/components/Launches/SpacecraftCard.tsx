import { FC } from 'react';
import styled from 'styled-components';

import CardHelper from '../UI/Card';
import { Colors } from '../../styledHelpers/Colors';
import { media } from '../../styledHelpers/Breakpoints';

const Card = styled(CardHelper)`
  color: white;
  width: 100%;
	background-color: ${Colors.cardBackground};
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ISpacecraftCard{
  name: string;
}
const SpacecraftCard: FC<ISpacecraftCard> = (props) => {
	return (
		<Card>
      <p>{props.name}</p>
		</Card>
	);
};

export default SpacecraftCard;
