const blogApiUrl = "https://v2.api.noroff.dev/blog/posts/saraal";

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos',
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};

async function getAndDisplayBlogPosts() {
    const carouselContainer = document.getElementById('carouselContainer')
    try {
        const response = await fetch(blogApiUrl)
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        const { data: blogPosts } = await response.json();

        if (!Array.isArray(blogPosts) || blogPosts.length === 0) {
            throw new Error('No blog post found');
        }

        carouselContainer.innerHTML = '';

        blogPosts.slice(0, 12).forEach((post, index) => {
            const slide = document.createElement('div')
            slide.classList.add('carousel-slider');
            if (index === 0) slide.classList.add('active');

            const anchorElement = document.createElement('a');
            anchorElement.href = `../HTML/blog-specific-post.html?id=${post.id}`;
            anchorElement.classList.add('slider-link');

            const titleElement = document.createElement('h2');
            titleElement.textContent = post.title;
            titleElement.classList.add('slider-title');

            const imgElement = document.createElement('img');
            imgElement.src = post.media.url;
            imgElement.alt = post.media.alt;
            imgElement.classList.add('slider-img');

            anchorElement.appendChild(titleElement);
            anchorElement.appendChild(imgElement);
            slide.appendChild(anchorElement);
            carouselContainer.appendChild(slide);

        });

        startCarouselSlide();
    } catch (error) {
        console.error('Error fetching blog posts', error);

        carouselContainer.innerHTML = `
        <div class="carousel-slide active">
        <h2>No posts!</h2>
        <p>Could not find the posts, please refresh the page or try again later</p>
        </div>
        `;
    }
}
function startCarouselSlide() {
    const multipleSlides = document.querySelectorAll('.carousel-slider');
    let startOnSlide = 0;

    function DisplaySlide(index) {
        multipleSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    function nextCarouselSlide() {
        startOnSlide = (startOnSlide + 1) % multipleSlides.length;
        DisplaySlide(startOnSlide);
    }
    setInterval(nextCarouselSlide, 3000);
    DisplaySlide(startOnSlide);
};
await getAndDisplayBlogPosts()