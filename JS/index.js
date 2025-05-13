async function getAndDisplayBlogPosts() {
    const carouselContainer = document.getElementById('carouselContainer')
    try{
        const response = await fetch('https://docs.noroff.dev/docs/v2/blog/posts')

    if(!response.ok){
        throw new Error(`Failed to fetch: ${response.status}`);
    }
    const {data: blogPosts} = await response.json();

    if (!Array.isArray(blogPosts) || blogPosts.length === 0){
        throw new Error('No blog post found');
    }

    carouselContainer.innerHTML = '';

    blogPosts.slice(0, 12). forEach ((post, index) => {
        const slide = document.createElement('div')
        slide.classList.add('carousel-slider');
        if (index === 0) slide.classList.add('active');
        slide.innerHTML= `
        <h2 class="slide-title">${post.title}</h2>
        <img src="${post.media.url}" alt="${post.media.alt}" class="slider-img">
        `;
        carouselContainer.appendChild(slide);
    });

    startCarouselSlide();
    } catch (error){
        console.error('Error fetching blog posts', error);

        carouselContainer.innerHTML = `
        <div class="carousel-slide active">
        <h2>No posts!</h2>
        <p>Could not find the posts, please refresh the page or try again later</p>
        </div>
        `;
    }
}
function startCarouselSlide(){
    const multipleSlides = document.querySelectorAll('.carousel-slider');
    let startOnSlide = 0;

    function DisplaySlide(index){
        multipleSlides.forEach((slide, i) =>{
            slide.classList.remove('active');
            if(i === index){
                slide.classList.add('active');
            }
        });
    }
    function nextCarouselSlide(){
        startOnSlide = (startOnSlide + 1) % multipleSlides.length;
        DisplaySlide(startOnSlide);
    }
    setInterval(nextCarouselSlide, 2000);
    DisplaySlide(startOnSlide);
}
getAndDisplayBlogPosts();