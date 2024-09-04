// Get elements
const totalIncomeDisplay = document.getElementById('total-income');
const totalExpensesDisplay = document.getElementById('total-expenses');
const balanceDisplay = document.getElementById('balance');
const pieChartCanvas = document.getElementById('pie-chart');
const addIncomeButton = document.getElementById('add-income');
const addExpenseButton = document.getElementById('add-expense');
const incomeInput = document.getElementById('income');
const expenseInput = document.getElementById('expense');
const amountInput = document.getElementById('amount');
const incomeList = document.getElementById('income-list');
const expenseList = document.getElementById('expense-list');

// Initialize variables
let totalIncome = 0;
let totalExpenses = 0;

// Add income event listener
addIncomeButton.addEventListener('click', () => {
  const income = parseFloat(incomeInput.value);
  totalIncome += income;

  // Update income list
  const incomeItem = document.createElement('li');
  incomeItem.textContent = `Income: $${income}`;
  incomeList.appendChild(incomeItem);

  // Update total income display
  totalIncomeDisplay.textContent = `Total Income: $${totalIncome.toFixed(2)}`;

  // Update balance
  updateBalance();

  // Draw pie chart
  drawPieChart();

  // Clear input field
  incomeInput.value = '';
});

// Add expense event listener
addExpenseButton.addEventListener('click', () => {
  const expense = expenseInput.value;
  const amount = parseFloat(amountInput.value);
  totalExpenses += amount;

  // Update expense list
  const expenseItem = document.createElement('li');
  expenseItem.textContent = `${expense}: $${amount}`;
  expenseList.appendChild(expenseItem);

  // Update total expenses display
  totalExpensesDisplay.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

  // Update balance
  updateBalance();

  // Draw pie chart
  drawPieChart();

  // Clear input fields
  expenseInput.value = '';
  amountInput.value = '';
});

// Update balance function
function updateBalance() {
  const balance = totalIncome - totalExpenses;
  balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;
}

// Draw pie chart function
let chart;

function drawPieChart() {
  const ctx = pieChartCanvas.getContext('2d');
  ctx.clearRect(0, 0, pieChartCanvas.width, pieChartCanvas.height);

  if (totalIncome === 0 && totalExpenses === 0) {
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';
    ctx.fillText('No data to display', pieChartCanvas.width / 2, pieChartCanvas.height / 2);
  } else {
    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          label: 'Budget',
          data: [totalIncome, totalExpenses], // use actual income and expenses data
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Budget Breakdown'
        }
      }
    });
  }
}