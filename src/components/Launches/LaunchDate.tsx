import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const LaunchTime = styled.div`
	display: flex;
	color: white;
	gap: 1rem;
	align-items: start;

	& > h2 {
		margin: 0;
	}
`;

const DatePart = styled.div`
	& > h2 {
		margin: 0;
	}
	& > p {
		margin: 4px 0;
	}
`;

export interface ILanuchDate {
	date: string;
}

const LaunchDate: FC<ILanuchDate> = (props) => {
	const [days, setDays] = useState<number>(0);
	const [hours, setHours] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(0);

	const timer = () => {
		//console.log(props.date);
		const countDownDate = new Date(props.date).getTime();
		const now = new Date().getTime();

		const duration = countDownDate - now;

		let days = Math.floor(duration / (1000 * 60 * 60 * 24));
		if (days < 0) days = 0;
		setDays(days);

		let hours = Math.floor(
			(duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		if (hours < 0) hours = 0;
		setHours(hours);

		let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
		if (minutes < 0) minutes = 0;
		setMinutes(minutes);

		let seconds = Math.floor((duration % (1000 * 60)) / 1000);
		if (seconds < 0) seconds = 0;
		setSeconds(seconds);
	};

	useEffect(() => {
		const countdown = setInterval(timer, 1000);
		return () => clearInterval(countdown);
	}, []);

  const date = new Date(props.date).toLocaleString();

	return (
		<>
			<LaunchTime>
				<h2>T -</h2>
				<DatePart>
					<h2>{days.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h2>
					<p>Days</p>
				</DatePart>
				<DatePart>
					<h2>{hours.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h2>
					<p>Hours</p>
				</DatePart>
				<DatePart>
					<h2>{minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h2>
					<p>Mins</p>
				</DatePart>
				<DatePart>
					<h2>{seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h2>
					<p>Secs</p>
				</DatePart>
			</LaunchTime>
			<p>{date}</p>
		</>
	);
};

export default LaunchDate;
