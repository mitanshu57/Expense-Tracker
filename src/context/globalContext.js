import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:6001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      // Update the state with the new income
      setIncomes([...incomes, response.data]);
    } catch (err) {
      // Ensure err.response and err.response.data exist before accessing them
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
    getIncomes()
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }

  };

  const deleteIncome = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
      console.log('Income deleted:', res.data);
      // Optionally refresh the incomes list or update the state
    } catch (error) {
      console.error('Error deleting income:', error.response || error.message);
      alert('Failed to delete income. Please try again later.');
    }
    getIncomes()
  };

  const totalIncome=()=>{
    let totalIncome=0;
    incomes.forEach((income)=>{
      totalIncome+=income.amount
    })
    return totalIncome
  }

  const addExpense = async (expenses) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expenses);
      // Update the state with the new income
      setExpenses([...expenses, response.data]);
    } catch (err) {
      // Ensure err.response and err.response.data exist before accessing them
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
    getExpenses()
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }

  };

  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
      console.log('Income deleted:', res.data);
      // Optionally refresh the incomes list or update the state
    } catch (error) {
      console.error('Error deleting income:', error.response || error.message);
      alert('Failed to delete income. Please try again later.');
    }
    getExpenses()
  };

  const totalExpense = () => {
    let totalExpense=0;
    expenses.forEach((expenses)=>{
      totalExpense+=expenses.amount
    })
    return totalExpense
  }

  const totalBalance = () =>{
    return totalIncome() - totalExpense()
  }

  const transactionHistory =()=>{
    const history = [...incomes,...expenses]
    history.sort((a,b)=>{
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return history
  }

  return (
    <GlobalContext.Provider value={{ addIncome, incomes, getIncomes, error,deleteIncome,expenses,totalIncome,addExpense,getExpenses,deleteExpense,totalExpense,totalBalance,transactionHistory }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
