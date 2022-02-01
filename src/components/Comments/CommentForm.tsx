import { FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';
import { MdOutlineClose } from 'react-icons/md';

export interface ICommentForm {
    submitHandler: (text: string, parentId?: any) => void,
    submitLabel: string,
    initialText: string,
    hasCancelButton: boolean,
    cancelHandler: any,
}

const Form = styled.form`
    & > textarea {
        width: 100%;
        border-radius: 10px;
        resize: none;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 1rem;
        outline: none;
        border: 2px solid ${Colors.mainThemeColor};
        background-color: transparent;
        color: white;
    }
    & > div {
        display: flex;
        justify-content: center;
        position: relative;
    }
`;
const ConfirmButton = styled.button`
    height: 30px;
    width: 50%;
    border-radius: 15px;
    border: none;
    color: white;
    background-color: ${Colors.mainThemeColor};
    font: inherit;
    transition: 0.2s ease;
    cursor: pointer;

    &:disabled {
        background-color: grey;
        color: lightgrey;
        width: 100px;
        cursor: default;
    }
`;

const CancelButton = styled.button`
    height: 30px;
    width: 30px;
    border-radius: 15px;
    border: none;
    outline: none;
    font: inherit;
    cursor: pointer;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease;
    position: absolute;
    right: 0;
    
    &:hover {
        background-color: red;
    }
    
    & > svg {
        color: white;
        font-size: 30px;
        font-weight: 900;
    }
`;


const CommentForm: FC<ICommentForm> = (props) => {
    const [enteredText, setEnteredText] = useState(props.initialText);
    const isTextAreaDisabled = enteredText.length === 0;

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.submitHandler(enteredText);
        setEnteredText('');
    };

    const textAreaChangeHander = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEnteredText(event.target.value);
    };

    return (
        <Form onSubmit={submitHandler}>
            <textarea value={enteredText} onChange={textAreaChangeHander} placeholder='Write here...'/>
            <div>
                <ConfirmButton type='submit' disabled={isTextAreaDisabled}>{props.submitLabel}</ConfirmButton>
                {props.hasCancelButton && 
                <CancelButton type='button' onClick={props.cancelHandler}><MdOutlineClose/></CancelButton>}
            </div>
        </Form>
    )
};

export default CommentForm;