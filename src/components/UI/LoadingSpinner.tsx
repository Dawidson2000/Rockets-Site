import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';

const Spinner = styled.div`
	display: inline-block;
	width: 80px;
	height: 80px;
  margin-top: 20px;

	&:after {
		content: ' ';
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid teal;
		border-color: ${Colors.mainThemeColor} transparent ${Colors.mainThemeColor} transparent;
		animation: spinner 1.2s linear infinite;
	}
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const LoadingSpinner: FC = () => {
	return <Spinner></Spinner>;
};

export default LoadingSpinner;
