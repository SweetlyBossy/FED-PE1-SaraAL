const showToggleMenuArea = document.getElementById('toggle-menu-container')
const toggleMenuImg = document.querySelector('.toggle-menu-button-icon');
const toggleMenubtn = document.getElementById('toggle-menu-button')

const toggleMenuImgChange = '../assets/icons/hamburger-menu-icon.png';
const toggleMenuClosingX = '../assets/icons/close-icon.png';


function loggedIn() {
    return localStorage.getItem('authKey') !== null;
}

function updateView(toggleMenuHtml) {
    if (!showToggleMenuArea) return;
    showToggleMenuArea.innerHTML = toggleMenuHtml;
}


function changeToggleMenu() {
    if (loggedIn()) {
        updateView(`
            <ul class="toggle-menu-clicked">
            <li>
            <a href="../index.html" class="toggle-menu-links">HOME</a>
            </li>
            <li>
            <a href="../HTML/blog-feed-post.html" class="toggle-menu-links">BLOG</a>
            </li>
            <li>
            <a href="../HTML/about.html" class="toggle-menu-links">ABOUT</a>
            </li>
            <li>
            <a href="../index.html" class="sign-out-link">SIGN OUT</a>
            </li>
            </ul>
            `);
        const signOutLink = showToggleMenuArea.querySelector('.sign-out-link');
        if (signOutLink) {
            signOutLink.addEventListener('click', e => {
                e.preventDefault();
                localStorage.removeItem('authKey');
                localStorage.removeItem('userName');
                closeToggleMenu();
                location.reload();
            });
        }
    } else {
        updateView(`
                  <ul class="toggle-menu-clicked">
            <li>
            <a href="../index.html" class="toggle-menu-links">HOME</a>
            </li>
            <li>
            <a href="../HTML/blog-feed-post.html" class="toggle-menu-links">BLOG</a>
            </li>
            <li>
            <a href="../HTML/about.html" class="toggle-menu-links">ABOUT</a>
            </li>
            <li>
            <a href="../HTML/sign-in.html" class="toggle-menu-links">SIGN IN</a>
            </li>
            <li>
            <a href="../HTML/sign-up.html" class="toggle-menu-links">SIGN UP</a>
            </li>
            </ul>
            `)
    }
}

function openToggleMenu() {
    changeToggleMenu();
    showToggleMenuArea.classList.add('open');
    toggleMenuImg.src = toggleMenuClosingX;
}

function closeToggleMenu() {
    showToggleMenuArea.classList.remove('open');
    toggleMenuImg.src = toggleMenuImgChange;
    showToggleMenuArea.innerHTML = '';
}

toggleMenubtn.addEventListener('click', () => {
    if (showToggleMenuArea.classList.contains('open')) {
        closeToggleMenu();
    } else {
        openToggleMenu();
    }
});

showToggleMenuArea.addEventListener('click', closeToggleMenu);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && showToggleMenuArea.classList.contains('open')) {
        closeToggleMenu();
    }
});
document.addEventListener('click', e => {
    if (!showToggleMenuArea.contains(e.target) && !toggleMenubtn.contains(e.target)) {
        if (showToggleMenuArea.classList.contains('open')) {
            closeToggleMenu();
        }
    }
});
