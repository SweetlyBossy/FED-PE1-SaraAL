const registerForm = document.getElementById('registerForm');
const messageElement = document.getElementById('message');

const registerApiUrl = 'https://v2.api.noroff.dev/auth/register';
const logInApiUrl =    'https://v2.api.noroff.dev/auth/login';

function validateEmailAccount (email){
    const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regularExpression.test(email)
}

function generateAuthKey (email, password){
    const combineData = email + password
    return btoa(combineData)
}

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    messageElement.style.color = 'white';
    messageElement.textContent = '';

    const lowerCaseEmail = registerForm.email.value.trim().toLowerCase();
    const userName = lowerCaseEmail.split('@')[0];
    const password = registerForm.password.value;
    const reEnterPassword = registerForm['re-enter password'].value;

    if(!lowerCaseEmail ){
        messageElement.style.color = '#ef5350';
        messageElement.textContent = 'Please enter your email.';
        return;
    }
    if(!validateEmailAccount(lowerCaseEmail)) {
        messageElement.style.color = '#ef5350';
        messageElement.textContent = 'Please enter a valid address';
        return;
    }
    if(!password || password.length < 8){
        messageElement.style.color = '#ef5350';
        messageElement.textContent = 'Password needs to be atleast 8 characters';
        return;
    }
    
    const payloadData = {
        name: userName,
        email: lowerCaseEmail,
        password,
        confirmPassword: reEnterPassword,
    };
    console.log(payloadData)

    fetch(registerApiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payloadData)
    })

    .then(async response =>{
        const result = await response.json();
        if(!response.ok){
            console.error('Error response:', result);
            throw new Error(result.message || 'Register failed.');
        }
        return result;
    })
    .then(() => {
        return fetch(logInApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: lowerCaseEmail,
                password: password
            })
        });
    })
    .then (res => res.json())
    .then(loginData => {
        localStorage.setItem('authKey', loginData.data.accessToken);
        localStorage.setItem('userName', loginData.data.name);

        messageElement.style.color = '#81c784';
        messageElement.textContent = 'Registered and logged in successfully';

        registerForm.reset();
        window.location.href = '../index.html';

    })
    .catch(err => {
        messageElement.style.color = '#ef5350';
        messageElement.textContent = err.message;
    });
});