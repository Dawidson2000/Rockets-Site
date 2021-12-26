import { FC } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { Colors } from '../../styledHelpers/Colors';

const InputWrapper = styled.div`
  border: 2px solid ${Colors.mainThemeColor};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 10px 20px;
  border-radius: 40px;

	& > svg {
		color: white;
    font-size: 1.5rem;
	}
`;

const Input = styled.input`
	background-color: transparent;
  outline: none;
  border: none;
  font: inherit;
  color: white;
`;

export interface ISearchInput {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: FC<ISearchInput> = (props) => {

	return (
    <InputWrapper>
    <BiSearch />
    <Input
      type='search'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </InputWrapper>
  );
};

export default SearchInput;
