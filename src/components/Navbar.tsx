import { FC, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../styledHelpers/Colors';
import { media } from '../styledHelpers/Breakpoints';

import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';


export interface INavWrapper {
	isMobileMenuVisible: boolean;
}

const NavWrapper = styled.div<INavWrapper>`
	width: 100%;
	height: 60px;
	background-color: black;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
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
		background-color: black;
		margin: 0;
		box-shadow: rgba(52, 86, 139, 0.5) 0px 10px 15px -3px,
			rgba(52, 86, 139, 0.05) 0px 4px 6px -2px;
		padding-right: 40px;
		gap: 1.5rem;
		width: 300px;
		transition: ease-in-out 0.2s;
		transform: ${(props) =>
			!props.isMobileMenuVisible ? 'translateX(300px)' : 'translateX(0px)'};

		& > li {
			display: flex;
			height: fit-content;
			justify-content: end;
		}
	}
`;

const Logo = styled.div`
	color: white;

	& > a {
		font-size: 2rem;
    text-decoration: none;
    color: white;
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

const StyledNavLink = styled(NavLink)`
	color: inherit;
	text-decoration: none;

	&.active {
		color: ${Colors.mainThemeColor};
	}
`;

const Navbar: FC = () => {
	const [isMobileMenuVisible, setIsMobileMenuVisible] =
		useState<boolean>(false);

	const showMobileMenuHandler = () => {
		setIsMobileMenuVisible((prevstate) => !prevstate);
	};

	return (
		<nav>
			<NavWrapper isMobileMenuVisible={isMobileMenuVisible}>
				<Logo>
					<Link to='/home' >BANDYTA</Link>
				</Logo>
				<ul>
					<li>
						<StyledNavLink to='/home'>Home</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to='/upcoming-launches'>
							Upcoming Launches
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to='/events'>Events</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to='/spacecrafts'>Spacecrafts</StyledNavLink>
					</li>
				</ul>
				<Hamburger onClick={showMobileMenuHandler}>
					{!isMobileMenuVisible ? <GiHamburgerMenu /> : <MdClose />}
				</Hamburger>
			</NavWrapper>
		</nav>
	);
};

export default Navbar;
