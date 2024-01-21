<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpense :income="+account.income" :expenses="+account.expenses" />
    <TransactionsList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionsList from './components/TransactionsList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref, computed, onMounted } from 'vue';

import { useToast } from 'vue-toastification';

const toast = useToast();

const transactions = ref([]);

onMounted(() =>
{
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if (savedTransactions)
  {
    transactions.value = savedTransactions;
  }
});

// Get total
const total = computed(() =>
{
  return transactions.value.reduce((acc, transaction) =>
  {
    return acc + transaction.amount;
  }, 0);
});

// Get income/expense info
const account = computed(() =>
{
  const data = { income: 0, expenses: 0 };
  transactions.value.forEach(tr =>
  {
    if (tr.amount < 0) data.expenses += tr.amount
    else data.income += tr.amount
  });
  console.log(data);
  return data;
})

// Submit transaction
const handleTransactionSubmitted = (transactionData) =>
{
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  });

  saveTransactionsToLocalStorage();

  toast.success('Transaction added.');
};

// Generate unique ID
const generateUniqueId = () =>
{
  return Math.floor(Math.random() * 1000000);
};

// Delete transaction
const handleTransactionDeleted = (id) =>
{
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  saveTransactionsToLocalStorage();

  toast.success('Transaction deleted.');
};

// Save transactions to local storage
const saveTransactionsToLocalStorage = () =>
{
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
</script>
