const authKey = localStorage.getItem('authKey');
const userName = localStorage.getItem('userName');

const hardCodedApiUrl = "https://v2.api.noroff.dev/blog/posts/winewhisperer";
const allPostsApiUrl = `https://v2.api.noroff.dev/blog/posts/${userName}`;

const carouselContainer = document.getElementById('carouselContainer')
const redirectToBlogPostFeed = document.getElementById('redirectToBlogFeedButton');


const hardCodedOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authKey}`,
        'X-Noroff-API-Key': '339be548-4eae-4260-bcd5-597493568802'
    }
};
const userOptions = authKey ? {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authKey}`,
        'X-Noroff-API-Key': '339be548-4eae-4260-bcd5-597493568802'

    }
} : null;

async function getAndDisplayBlogPosts() {
    try {
        const hardCodedResponse = await fetch(hardCodedApiUrl, hardCodedOptions)
        const { data: hardCodedPosts } = await hardCodedResponse.json();

        let allPosts =[...hardCodedPosts];

        const allPostsResponse = await fetch(allPostsApiUrl, {
            method: 'GET',
            headers: hardCodedOptions.headers,
        });
        
        if(allPostsResponse.ok){
            const { data: userPosts } = await allPostsResponse.json();
            allPosts = [...allPosts, ...userPosts];
            
        } else {
            console.error('Failed to fetch user posts');
        }

        const sortedPosts = allPosts
            .filter(post => post.created)
            .sort((a, b) => new Date (b.created) - new Date(a.created))
            .slice(0, 12);

        displayPostInCarousel(sortedPosts);

    } catch (error) {
        console.error('Error fetching Posts', error)
        carouselContainer.innerHTML =
            `<div class="carousel-slide active">
        <h2> could not load posts</h2>
        <p> Please try again later.</p>
        </div>
    `;
    }
}
function displayPostInCarousel(posts) {
    if (!posts || posts.length === 0) {
        carouselContainer.innerHTML =
            `<div class="carousel-slide active">
        <h2> Could not load posts</h2>
        <p> Try again later</p>
        `;
        return;
    }
    carouselContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slider');
        if (index === 0) slide.classList.add('active');

        const anchor = document.createElement('a');
        anchor.href = `../HTML/blog-specific-post.html?id=${post.id}`;
        anchor.classList.add('slider-link');

        const title = document.createElement('h2');
        title.textContent = post.title;
        title.classList.add('slider-title');

        const img = document.createElement('img');
        img.src = post.media?.url;
        img.alt = post.media?.alt;
        img.classList.add('slider-img');

        anchor.appendChild(title);
        anchor.appendChild(img);
        slide.appendChild(anchor);
        carouselContainer.appendChild(slide);
    });

    startCarouselSlider();
}
function startCarouselSlider() {
    const slides = document.querySelectorAll('.carousel-slider');
    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
}
showSlide(currentSlide);

const interval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');

if(previousButton && nextButton) {
    previousButton.addEventListener ('click', () =>{
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    nextButton.addEventListener ('click', () =>{
        currentSlide = (currentSlide + 1 ) % slides.length;
        showSlide(currentSlide);
    });
}
}
redirectToBlogPostFeed.addEventListener('click', () => {
    window.location.href = `/HTML/blog-feed-post.html`;
});

getAndDisplayBlogPosts();