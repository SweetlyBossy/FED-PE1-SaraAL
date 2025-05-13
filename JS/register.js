const registerForm = document.getElementById('registerForm');
const messageElement = document.getElementById('message');

const apiUrl = 'https://v2.api.noroff.dev/auth/register';

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
    const authKey = generateAuthKey(lowerCaseEmail , password);
    const reEnterPassword = registerForm['re-enter password'].value;
    
    const payloadData = {
        name: userName,
        email: lowerCaseEmail,
        password,
        confirmPassword: reEnterPassword,
    };
    console.log(payloadData)
    fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payloadData)
    })
    .then(async response =>{
        if(!response.ok){
            const errorData = await response.json();
            console.error('Error response:', errorData)
            throw new Error(errorData.message || 'Register failed.');
        }
        return response.json();
    })
    .then (data => {
        console.log('sending user data to:', apiUrl)
        console.log('User created:', data)
        console.log('payload data:', JSON.stringify(payloadData));
        messageElement.style.color = '#81c784';
        messageElement.textContent = 'Register Successful!';
        localStorage.setItem('authKey', authKey)
        registerForm.reset();
    })
    .catch(err => {
        messageElement.style.color = '#ef5350';
        messageElement.textContent = err.message;
    });
});
