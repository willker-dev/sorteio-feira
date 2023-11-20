document.addEventListener("DOMContentLoaded", () => {
    const monthlyIncomeInput = document.getElementById("monthly-income");
    const expenseList = document.getElementById("expense-list");
    const addExpenseButton = document.getElementById("add-expense");
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const balance = document.getElementById("balance");
    const investmentTipsList = document.getElementById("investment-tips");
    const resetButton = document.getElementById("reset-button");
    const calculateInvestmentButton = document.getElementById("calculate-investment");
    const monthlyInvestmentInput = document.getElementById("monthly-investment");
    const investmentYearsInput = document.getElementById("investment-years");
    const investmentSimulation = document.getElementById("investment-simulation");
    const investmentSummary = document.getElementById("investment-summary");
    const purchaseList = document.getElementById("purchase-list");
    const categorySelector = document.getElementById("category-selector");

    let expenses = [];
    let monthlyInvestment = 0;
    let investmentYears = 1; // Valor padrão de 1 ano
    let currentBalance = 0;
    const annualInterestRate = 0.08; // Taxa de juros anual (8% ao ano)

    addExpenseButton.addEventListener("click", () => {
        const expenseName = prompt("Nome da Despesa:");
        const expenseAmount = parseFloat(prompt("Valor da Despesa:"));

        if (expenseName && !isNaN(expenseAmount)) {
            expenses.push({ name: expenseName, amount: expenseAmount });
            updateExpenseList();
            provideInvestmentTips();
            calculateInvestment();
        }
    });

    function updateExpenseList() {
        let expenseHTML = "";
        let totalExpenseAmount = 0;

        expenses.forEach((expense) => {
            expenseHTML += `<li>${expense.name}: R$ ${expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>`;
            totalExpenseAmount += expense.amount;
        });

        expenseList.innerHTML = expenseHTML;
        totalExpenses.textContent = `R$ ${totalExpenseAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateBalance() {
        const income = parseFloat(monthlyIncomeInput.value);
        const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        currentBalance = income - totalExpenseAmount - monthlyInvestment;
        balance.textContent = `R$ ${currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // Atualizar a lista de itens compráveis
        updatePurchaseList();
    }

    function provideInvestmentTips() {
        const totalIncomeValue = parseFloat(monthlyIncomeInput.value);
        const tipsList = [
            "Considere investir parte de sua renda em um fundo de investimento de baixo risco.",
            "Diversifique seus investimentos para reduzir o risco. Considere ações, títulos e fundos mútuos.",
            "Mantenha uma reserva de emergência equivalente a pelo menos três a seis meses de despesas.",
            "Pense a longo prazo ao investir, e não se preocupe com flutuações de curto prazo.",
            "Procure orientação de um profissional financeiro para ajudá-lo a criar uma estratégia de investimento sólida."
        ];

        let investmentTipsHTML = "";

        if (!isNaN(totalIncomeValue) && totalIncomeValue > 0) {
            tipsList.forEach((tip) => {
                investmentTipsHTML += `<li>${tip}</li>`;
            });
        }

        investmentTipsList.innerHTML = investmentTipsHTML;
    }

    function calculateInvestment() {
        const monthlyInvestmentValue = parseFloat(monthlyInvestmentInput.value);

        if (!isNaN(monthlyInvestmentValue) && monthlyInvestmentValue >= 50) {
            monthlyInvestment = monthlyInvestmentValue;
        } else {
            monthlyInvestment = 0;
        }

        investmentYears = parseFloat(investmentYearsInput.value);

        if (isNaN(investmentYears) || investmentYears <= 0) {
            investmentYears = 1; // Valor mínimo de 1 ano
        }

        const monthlyInterestRate = annualInterestRate / 12; // Taxa de juros mensal

        let totalInvestment = 0;

        for (let i = 0; i < investmentYears * 12; i++) {
            totalInvestment += monthlyInvestment;
            totalInvestment *= 1 + monthlyInterestRate;
        }

        investmentSimulation.textContent = `Se você investir R$ ${monthlyInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por mês durante ${investmentYears} anos com uma taxa de juros anual de 8%, seu investimento total será de R$ ${totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`;

        // Atualizar o saldo disponível após o investimento
        updateBalance();

        // Adicionar o valor investido ao resumo de orçamento
        investmentSummary.textContent = `Valor investido mensalmente: R$ ${monthlyInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        // Mostrar elementos após o cálculo
        investmentTipsList.classList.remove("hidden");
        purchaseList.classList.remove("hidden");
}


    function updatePurchaseList() {
        const itemsByCategory = {
            eletronicos: [
                { name: "iPhone", price: 7000.00 },
                { name: "Notebook", price: 3000.00 },
                { name: "Smartwatch", price: 800.00 },
                { name: "Console de Videogame", price: 4000.00 },
            ],
            lazer: [
                { name: "Viagem", price: 150000.00 },
                { name: "Roupas de Marca", price: 500.00 },
            ],
            saude: [
                { name: "Academia", price: 100.00 },
                { name: "Nutricionista", price: 1000.00 },
            ],
            outros: [
                { name: "Livros", price: 200.00 },
                { name: "Cursos Online", price: 150.00 },
                { name: "Passeios", price: 400.00 },
                // Adicione mais itens conforme necessário
            ],
        };

        const selectedCategory = categorySelector.value;
        const selectedItems = itemsByCategory[selectedCategory];

        let purchaseHTML = "";

        if (selectedItems) {
            selectedItems.forEach((item) => {
                if (currentBalance >= item.price) {
                    purchaseHTML += `<li>${item.name}: R$ ${item.price.toFixed(2)}</li>`;
                }
            });
        }

        purchaseList.innerHTML = purchaseHTML;
    }

    resetButton.addEventListener("click", () => {
        // Limpar todas as informações e recarregar a página
        location.reload();
    });

    monthlyIncomeInput.addEventListener("input", () => {
        updateBalance();
        provideInvestmentTips();
    });

    calculateInvestmentButton.addEventListener("click", () => {
        calculateInvestment();
    });

    categorySelector.addEventListener("change", () => {
        // Atualizar a lista de itens compráveis quando a categoria é alterada
        updatePurchaseList();
    });
});
