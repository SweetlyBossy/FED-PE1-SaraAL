const signInForm = document.getElementById('signInForm');
const signInMessageElement = document.getElementById('signInMessage');

const signInApiUrl = 'https://v2.api.noroff.dev/auth/login';

function validateEmailAccount (email){
    const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regularExpression.test(email)
}

signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    signInMessageElement.style.color = 'white';
    signInMessageElement.textContent = '';

    const lowerCaseEmail = signInForm.email.value.trim().toLowerCase();
    const password = signInForm.password.value;

    if(!lowerCaseEmail){
        signInMessageElement.style.color = '#ef5350'
        signInMessageElement.textContent = 'Please enter your e-mail';
        return;
    }
    if(!validateEmailAccount(lowerCaseEmail)){
        signInMessageElement.style.color = '#ef5350'
        signInMessageElement.textContent = 'Please enter a valid e-mail address';
        return;
    }
    if(!password){
        signInMessageElement.style.color = '#ef5350'
        signInMessageElement.textContent = 'Please enter your password';
        return;
    }

    const payloadData = {
        email: lowerCaseEmail,
        password,
    };

    fetch(signInApiUrl, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(payloadData),
    })
    .then(async response => {
        if(!response.ok){
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(errorData.message || 'Sign in failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('User signed in:', data);
        signInMessageElement.style.color = '#81c784'
        signInMessageElement.textContent = 'Sign in Successful!';

        localStorage.setItem('authKey', data.authKey);

        window.location.href = '../index.html';
    })
    .catch(err =>{
        signInMessageElement.style.color = '#ef5350'
        signInMessageElement.textContent = err.message;
    });
});