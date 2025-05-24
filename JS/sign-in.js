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
        const result = await response.json();
        if(!response.ok){
            console.error('Error response:', result);
            throw new Error(result.message || 'Sign in failed');
        }
        return result;
    })
    .then(data => {
        console.log('User signed in:', data);
        localStorage.setItem('authKey', data.data.accessToken);
        localStorage.setItem('userName', data.data.name);

        signInMessageElement.style.color = '#81c784'
        signInMessageElement.textContent = 'Sign in Successful!';
        signInForm.reset();

        window.location.href = '../index.html';
    })
    .catch(err =>{
        signInMessageElement.style.color = '#ef5350'
        signInMessageElement.textContent = err.message;
    });
});