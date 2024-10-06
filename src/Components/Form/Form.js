import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';

function Form() {
    const { addIncome,getIncomes } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: ''
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addIncome(inputState);
        getIncomes()
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
    })
            
    };

    return (
        <FormStyled onSubmit={handleSubmit}>

            <div className="input-control">
                <input 
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder='Income Title'
                    onChange={handleInput('title')}
                    required
                />
            </div>
            <div className="input-control">
                <input 
                    type="number"
                    value={amount}
                    name={'amount'}
                    placeholder={'Income Amount'}
                    onChange={handleInput('amount')}
                    required
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Select a date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                    required
                />
            </div>
            <div className="selects input-control">
                <select 
                    required 
                    value={category} 
                    name="category" 
                    id="category" 
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description"
                    value={description}
                    placeholder='Add a Description'
                    id='description'
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
            <Button
  name={'Add Income'}
  icon={plus}
  bPad={'.8rem 1.6rem'}
  bRad={'30px'}
  bg={'var(--color-accent)'}
  color={'#fff'}
/>

            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input, select, textarea {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
        color: rgba(34,34,96,0.9);
        &::placeholder {
            color: rgba(34,34,96,0.4);
        }
    }

    .input-control {
    input{
    width: 100%;
    }
        
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34,34,96,0.4);
            &:focus, &:active {
                color: rgba(34,34,96,0.4);
            }
        }
    }

 
  .submit-btn {
    display: flex;
    justify-content: center;
    button {
      box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
      transition: background 0.3s ease;
      &:hover {
        background: var(--color-green);
      }
    }
  }
`;

export default Form;
