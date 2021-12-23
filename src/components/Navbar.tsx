import { FC, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../styledHelpers/Colors';
import { media } from '../styledHelpers/Breakpoints';

import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';


export interface INavWrapper {
  isMobileMenuVisible: boolean;
}

const NavWrapper = styled.div<INavWrapper>`
	width: 100%;
	height: 60px;
	background-color: ${Colors.cardBackground};
	position: fixed;
	top: 0;
  left: 0;
	z-index: 10;
	box-shadow: rgba(52, 86, 139, 0.5) 0px 10px 15px -3px,
		rgba(52, 86, 139, 0.05) 0px 4px 6px -2px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40px;
	box-sizing: border-box;

	& > ul {
		color: white;
		list-style: none;
    box-sizing: border-box;

		& > li {
			display: flex;
			height: 100%;
			align-items: center;
			transition: ease-in-out 0.1s;

			&:hover {
				color: ${Colors.mainThemeColor};
				cursor: pointer;
			}
		}

		${media.tablet`
      position: relative;
      top: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
		  gap: 1.5rem;
		  height: 100%;
      background-color: transparent;
      box-shadow: none;
      padding-right: 0px;
      width: fit-content;
      transform: translateX(0px);
      transition: none;
    `}

		display: flex;
		flex-direction: column;
		position: absolute;
		top: 60px;
		right: 0;
		height: 100vh;
		background-color: ${Colors.cardBackground};
		margin: 0;
		box-shadow: rgba(52, 86, 139, 0.5) 0px 10px 15px -3px,
			rgba(52, 86, 139, 0.05) 0px 4px 6px -2px;
		padding-right: 40px;
		gap: 1.5rem;
		width: 300px;
    transition: ease-in-out 0.2s;
    transform: ${props => props.isMobileMenuVisible ? 'translateX(300px)' : 'translateX(0px)'};

		& > li {
			display: flex;
			height: fit-content;
			justify-content: end;
		}
	}
`;

const Logo = styled.div`
	color: white;

	& > span {
		font-size: 2rem;
	}
`;

const Hamburger = styled.button`
	display: flex;
	background-color: transparent;
	outline: none;
	border: none;

	${media.tablet`
      display: none;
    `}

	& > svg {
		color: white;
		font-size: 1.8rem;
		cursor: pointer;
		transition: ease-in-out 0.1s;
	}

	&:hover > svg {
		color: ${Colors.mainThemeColor};
	}

	&:active > svg {
		transform: scale(0.8);
	}
`;

const Navbar: FC = () => {
	const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);

	const showMobileMenuHandler = () => {
    setIsMobileMenuVisible(prevstate => !prevstate);
  };

	return (
		<nav>
			<NavWrapper isMobileMenuVisible={isMobileMenuVisible}>
				<Logo>
					<span>BANDYTA</span>
				</Logo>
				<ul>
					<li>Home</li>
					<li>Upcoming Launches</li>
					<li>Events</li>
					<li>Rockets</li>
				</ul>
				<Hamburger onClick={showMobileMenuHandler}>
					{isMobileMenuVisible ? <GiHamburgerMenu /> : <MdClose />}
				</Hamburger>
			</NavWrapper>
		</nav>
	);
};

export default Navbar;
