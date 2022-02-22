import { useFormik, Field, FormikProvider } from 'formik';
import { FC } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Colors } from '../../styledHelpers/Colors';

const NationCheckboxes: FC = () => {
  const submitHandler = (values: any) => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues: {
			nations: [],
		},
		onSubmit: submitHandler,
	});

	return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div role='group'>
          <label htmlFor='usaCheckbox'>USA</label>
          <Field id="usaCheckbox" type='checkbox' name='nations' value='USA'/>
          
          <label htmlFor='russiaCheckbox'>RUSSIA</label>
          <Field id="russiaCheckbox" type='checkbox' name='nations' value='RUS'/>       
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormikProvider>
	);
};

export default NationCheckboxes;
