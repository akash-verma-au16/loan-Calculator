class Operations {
  constructor() {
    this.amount = document.querySelector('#amount');
    this.interest = document.querySelector('#interest');
    this.years = document.querySelector('#years');
    this.monthlyPayment = document.querySelector('#monthly-payment');
    this.totalPayment = document.querySelector('#total-payment');
    this.totalInterest = document.querySelector('#total-interest');
  };

  calculateResults() {
    const principal = parseFloat(this.amount.value);
    const calculatedInterest = parseFloat(this.interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(this.years.value) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
      this.monthlyPayment.value = monthly.toFixed(2);
      this.totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      this.totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

      document.querySelector('#results').style.display = 'block';
      this.resetInputFields();
    } else {
      this.showError('Please check your numbers');
      this.resetInputFields();
    };
  };

  showError(error){
    document.querySelector('#results').style.display = 'none';

    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    
    card.insertBefore(errorDiv, heading);

    setTimeout(this.clearError, 1000);
  };

  clearError(){
    document.querySelector('.alert').remove();
  };

  resetInputFields() {
    this.amount.value = '';
    this.interest.value = '';
    this.years.value = '';
  };
};
 

document.querySelector('#results').style.display = 'none'; 
document.querySelector('#form-submit').addEventListener('click', (e) => {
  const run = new Operations;
  run.calculateResults();
  e.preventDefault();
});