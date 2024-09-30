import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { useExpenses } from '@/components/ExpenseContext';
import { Expense } from '@/components/type';

const ExpensesScreen: React.FC = () => {
  const { expenses, addExpense, updateExpense } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [mode, setMode] = useState<'list' | 'add' | 'edit' | 'detail'>('list');
  const [form, setForm] = useState<{ amount: string; category: string; date: string; description: string }>({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  const handleAddExpense = () => {
    const newExpense: Expense = {
      id: Math.random().toString(),
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
      description: form.description
    };
    addExpense(newExpense);
    setMode('list');
    setForm({ amount: '', category: '', date: new Date().toISOString().split('T')[0], description: '' });
  };

  const handleUpdateExpense = () => {
    if (selectedExpense) {
      const updatedExpense: Expense = {
        ...selectedExpense,
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
        description: form.description
      };
      updateExpense(updatedExpense);
      setMode('list');
      setSelectedExpense(null);
      setForm({ amount: '', category: '', date: new Date().toISOString().split('T')[0], description: '' });
    }
  };

  const renderList = () => (
    <>
      <Image source={require('@/assets/images/expenses.jpg')} style={styles.headerImage} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Total Expenses: GH₵ {totalExpenses.toFixed(2)}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => { setSelectedExpense(item); setMode('detail'); }}
              style={styles.itemContainer}
            >
              <View style={styles.textContainer}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Text style={styles.amount}>GH₵ {item.amount.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </ThemedView>
      <TouchableOpacity style={styles.addButton} onPress={() => setMode('add')}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>
    </>
  );

  const renderDetail = () => (
    <>
      <Image source={require('@/assets/images/expenses.jpg')} style={styles.headerImage} />
      <View style={styles.detailContainer}>
        {selectedExpense && (
          <>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{selectedExpense.category}</Text>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{selectedExpense.date}</Text>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>GH₵ {selectedExpense.amount.toFixed(2)}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{selectedExpense.description}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => { 
                setMode('edit'); 
                setForm({
                  amount: selectedExpense.amount.toString(),
                  category: selectedExpense.category,
                  date: selectedExpense.date,
                  description: selectedExpense.description
                });
              }}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => setMode('list')}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );

  const renderForm = () => (
    <>
      <Image source={require('@/assets/images/expenses.jpg')} style={styles.headerImage} />
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Amount"
          value={form.amount}
          onChangeText={(text) => setForm({ ...form, amount: text })}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={form.category}
          onChangeText={(text) => setForm({ ...form, category: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={mode === 'add' ? handleAddExpense : handleUpdateExpense}
        >
          <Text style={styles.submitButtonText}>
            {mode === 'add' ? "Add Expense" : "Update Expense"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {
          setMode('list');
          setSelectedExpense(null);
          setForm({ amount: '', category: '', date: new Date().toISOString().split('T')[0], description: '' });
        }}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <>
      {mode === 'list' && renderList()}
      {(mode === 'add' || mode === 'edit') && renderForm()}
      {mode === 'detail' && renderDetail()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerImage: {
    height: 250,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  date: {
    color: '#3498db',
  },
  description: {
    color: '#95a5a6',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#2c3e50',
  },
  value: {
    fontSize: 16,
    marginVertical: 5,
    color: '#7f8c8d',
  },
  editButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#95a5a6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpensesScreen;
