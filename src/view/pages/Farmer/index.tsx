import * as React from 'react';
import createTabManager from '../../hoc/TabManager';
import Collect from './tabs/Collect';
import Loan from './tabs/Loan';
import Buy from './tabs/Buy';
import Info from './tabs/Info';

const createCollect = () => (
  <Collect
    farmerName="Bradley the Farmer"
    currentDayTotal="3944.2"
    currentWeekTotal="3.4"
    currentMonthTotal="0.2"
    collectTransactions={[{ date:'Jan 4', am: 2, pm:2 }, { date:'Jan 3', am: 2, pm:2 }, { date:'Jan 2', am: 2, pm:2 }, { date:'Jan 1', am: 2, pm:2 }]}
  />
);

const demoLoanTransactions = [
  { date:'Jan 19', remainingBalance: '25', weeklyPayment: '5' },
  { date:'Jan 18', remainingBalance: '10', weeklyPayment: '10' },
  { date:'Jan 17', remainingBalance: '10', weeklyPayment: '50' },
  { date:'Jan 16', remainingBalance: '20', weeklyPayment: '5' },
  { date:'Jan 15', remainingBalance: '10', weeklyPayment: '12' },
];

const createLoan = () => (
  <Loan
    farmerName="Bradley the Farmer"
    totalWeeklyPaymentBalence="5"
    totalRemainingBalance="35"
    loanTransactions={demoLoanTransactions}
  />
);

const demoPurchaseTransactions = [
  { date:'Jan 19', product: 'Cow Feed', quantity: '2', price: '6.50' },
  { date:'Jan 18', product: 'Soap', quantity: '2', price: '6.00' },
  { date:'Jan 17', product: 'Cow Feed', quantity: '2', price: '6.50' },
  { date:'Jan 16', product: 'Soap', quantity: '2', price: '6.00' },
  { date:'Jan 15', product: 'Soap', quantity: '1', price: '3.00' },
];

const createBuy = () => (
  <Buy
    farmerName="Bradley the Farmer"
    currentDayTotal="1001.01"
    currentWeekTotal="50"
    currentMonthTotal="405.50"
    purchaseTransactions={demoPurchaseTransactions}
  />
);

const createInfo = () => (
  <Info
    farmerFirstName="Patrick"
    farmerLastName="Keena"
    farmerPhoneNumber="123-456-789"
    farmerNotes="Doctor from village A"
  />
);

export default createTabManager(
  [
    {
      name: 'Collect',
      element: createCollect,
    },
    {
      name: 'Loan',
      element: createLoan,
    },
    {
      name: 'Shop',
      element: createBuy,
    },
    {
      name: 'Info',
      element: createInfo,
    },
  ],
);
