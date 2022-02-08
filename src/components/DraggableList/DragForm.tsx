import { useFormik } from 'formik';
import { FC } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Colors } from '../../styledHelpers/Colors';
import { HiOutlineViewGridAdd } from 'react-icons/hi';

const Form = styled.form`
	width: 50%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	position: relative;

	& > button {
		background-color: transparent;
		margin-left: auto;
		color: white;
		outline: none;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		position: absolute;
		right: 0;
		box-sizing: border-box;

		&:hover > svg {
			color: #88b04b;
		}

		&:active {
			transform: scale(0.9);
		}

		& > svg {
			font-size: 1.6rem;
		}
	}

	& > input {
		background-color: transparent;
		border: none;
		border-bottom: 2px solid white;
		outline: none;
		font: inherit;
		color: white;
		width: 100%;
		font-size: 1.2rem;
		padding-right: 40px;
		box-sizing: border-box;

    &:focus{
      border-bottom: 2px solid ${Colors.mainThemeColor};
    }

		&::placeholder {
			color: gray;
		}
	}
`;

const ErrorMessage = styled.p`
	color: #9b2335;
	margin: 0;
  font-size: 0.8rem;
`;

export interface IDragForm {
	onAddToList: (item: { title: string }) => void;
}

const DragForm: FC<IDragForm> = (props) => {
	const submitHandler = (values: any) => {
		props.onAddToList(values);
		formik.resetForm();
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.required('Tytuł jest wymagany')
			.max(40, 'Tytuł może posiadac maksymalnie 30 znaków'),
	});

	const formik = useFormik({
		initialValues: {
			title: '',
		},
		validationSchema,
		onSubmit: submitHandler,
	});

	const getErrorMessage = (error: any) => {
		if (error) return <ErrorMessage>{error}</ErrorMessage>;
	};

	return (
		<>
			<Form onSubmit={formik.handleSubmit}>
				<label htmlFor='email' />
				<input
					placeholder='Write title'
					id='email'
					type='text'
					name='title'
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.title}
				/>
				<button type='submit'>
					<HiOutlineViewGridAdd />
				</button>
			</Form>
			{getErrorMessage(formik.errors.title)}
		</>
	);
};

export default DragForm;
