const authKey = localStorage.getItem('authKey');
const userName = localStorage.getItem('userName');

const hardCodedApiUrl = "https://v2.api.noroff.dev/blog/posts/saraal";
const allPostsApiUrl = `https://v2.api.noroff.dev/blog/posts`;

const carouselContainer = document.getElementById('carouselContainer')
const redirectToBlogPostFeed = document.getElementById('redirectToBlogFeedButton');


const hardCodedOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos`,
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};
const userOptions = authKey ? {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authKey}`,
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'

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
            console.log(userPosts)
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

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 3000);
}

redirectToBlogPostFeed.addEventListener('click', () => {
    window.location.href = `/HTML/blog-feed-post.html`;
});

getAndDisplayBlogPosts();