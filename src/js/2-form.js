import validator from 'validator';

const formData = { email: '', message: '' };
const localStorageKey = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const getDataFromLocalStorage = () => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey));

  if (savedData) {
    formData.email = savedData.email;
    formData.message = savedData.message;

    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};
getDataFromLocalStorage();

const updateFormData = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

const sendProcessedData = event => {
  event.preventDefault();

  const { email, message } = formData;

  if (email === '' || message === '') {
    alert('Fill in all fields');
    return;
  }

  if (!validator.isEmail(email)) {
    alert('Invalid email');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
};

form.addEventListener('input', updateFormData);
form.addEventListener('submit', sendProcessedData);
