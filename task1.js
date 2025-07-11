// File: task1/task1.js

document.getElementById('ageForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const dobInput = document.getElementById('dob').value;
  const resultDiv = document.getElementById('result');

  if (!dobInput) {
    resultDiv.textContent = '❌ Please select your Date of Birth.';
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    resultDiv.textContent = '❌ Date of birth cannot be in the future.';
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  resultDiv.textContent = ` You are ${years} year(s), ${months} month(s), and ${days} day(s) old! `;
  resultDiv.classList.remove('fade-in');
  void resultDiv.offsetWidth; // trigger reflow for animation restart
  resultDiv.classList.add('fade-in');
});
