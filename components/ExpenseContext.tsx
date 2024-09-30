// ExpensesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface ExpensesContextProps {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (updatedExpense: Expense) => void;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, updateExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = (): ExpensesContextProps => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
};
