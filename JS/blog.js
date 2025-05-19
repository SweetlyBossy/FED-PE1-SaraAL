const initialBlogPosts = [
    {
        title: "Pierre Girardin",
        body: `
        <h1 class="blog-post-title">Pierre Girardin</h1>
        <img src="https://freeimage.host/i/3PnLkKl" alt="Close-up of a 2017 Pierre Girardin Meursault Premier Cru Les Charmes wine bottle label, showcasing elegant typography and logo on a cream-colored label."/>
        <button class="share-button"><img src="https://freeimage.host/i/3Pog7K7" alt="an icon of a sharing button"/></button>
        <main class="main-overal-container">
        <article class="blog-post-article-container">
        <p class="blog-post-body-text">There are wines that whisper… and then there are wines that speak with history. This Chambertin Grand Cru by young Pierre Girardin—oh, it sings with the old soul of Burgundy, yet carries the youthful pulse of a new generation. A rare and thrilling harmony.</p>
        <p class="blog-post-body-text">From the moment it opens, the nose pulls you in with that signature Grand Cru depth—wild raspberries laced with forest floor, crushed violets, and a touch of that earthy spice you only get from old Pinot vines. There's something almost haunting about it. Like it knows stories you haven’t heard yet.</p>
        <p class="blog-post-body-text">On the palate? Silky but structured. It doesn’t shout—it seduces. Layers unfold slowly: redcurrants, black tea, a brush of rose petal, and then that fine mineral tension that holds everything in place. The oak is there, sure, but it’s not showing off. Eight months in new wood has given it grace, not gloss.</p>
        <p class="blog-post-body-text">This is a wine built to last. It may already be charming, but give it time and it will only grow more profound—like any good story worth retelling.</p>
        <p class="blog-post-body-text">If I were pairing it? A slow-cooked duck confit or wild mushroom risotto would be divine. Or, better yet, a quiet evening, a good friend, and no distractions. Let it speak.</p>
        </article>
        </main>`,
        media: {
            url: "https://freeimage.host/i/3PnLkKl",
            alt: "Close-up of a 2017 Pierre Girardin Meursault Premier Cru Les Charmes wine bottle label, showcasing elegant typography and logo on a cream-colored label.",
            shareButton: "https://freeimage.host/i/3Pog7K7",
            alt2: "an icon of a sharing button",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        title: "Villa Borgetti Valpolicella Clssico",
        body: `
     <h1 class="blog-post-title">Villa Borgetti Valpolicella Clssico</h1>
        <img src="https://freeimage.host/i/3iuA1Sf" alt="Two glasses of red wine tilted toward each other in a celebratory toast against a dark gradient background."/>
        <button class="share-button"><img src="https://freeimage.host/i/3Pog7K7" alt="an icon of a sharing button"/></button>
     <main class="main-overal-container">
       <article class="blog-post-article-container">
       <p class="blog-post-body-text">Ah, Valpolicella—a name that sings of sun-drenched Italian hills and the artistry of generations. The Villa Borghetti Valpolicella is a delightful expression of this storied region, offering a glimpse into the heart of Veneto.​</p>
       <p class="blog-post-body-text">In the glass, it presents a vibrant ruby hue, inviting you into its fresh and youthful character. The bouquet is an elegant medley of ripe cherries and red berries, with subtle whispers of fresh herbs and a hint of vanilla. ​</p>
       <p class="blog-post-body-text">On the palate, this wine is well-structured and balanced, with a roundness that makes it approachable and versatile. The flavors mirror the nose, dominated by juicy red fruits and complemented by a touch of spice. The finish is clean and refreshing, leaving a lingering impression of the wine's harmonious profile.</p>
       <p class="blog-post-body-text">Crafted primarily from Corvina (70%), with Rondinella (20%) and Molinara (10%) rounding out the blend, this wine embodies the traditional varietal composition of Valpolicella. Its moderate alcohol content (12%) and balanced acidity make it a versatile companion at the table. ​</p>
       <p class="blog-post-body-text">Pair this charming red with dishes like grilled pork tenderloin, roasted chicken, or even a hearty seafood stew. Its adaptability also makes it a delightful partner to classic Italian fare such as pasta with tomato-based sauces or a simple Margherita pizza.​</p>
       <p class="blog-post-body-text">In essence, the Villa Borghetti Valpolicella is a testament to the elegance and charm of Veneto's winemaking tradition—a bottle that brings a touch of Italian sunshine to any occasion.</p>
       </article>
        </main>
    `,
        media: {
            url: "https://freeimage.host/i/3iuA1Sf",
            alt: "Two glasses of red wine tilted toward each other in a celebratory toast against a dark gradient background.",
            shareButton: 'https://freeimage.host/i/3Pog7K7',
            alt2: 'an icon of a sharing button',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const blogApiUrl = "https://v2.api.noroff.dev/blog/posts/saraAl";

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos',
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};

const createBlogPost = async (post) => {
    try {
        const response = await fetch(blogApiUrl, {
            method: "POST",
            headers: options.headers,
            body: JSON.stringify(post)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to create blog post.");
        }
        console.log("Post created successfully", data);
    } catch (error) {
        console.error("Error creating post", error.message);
    }
};
const postBlogPosts = async () => {
    for (const post of initialBlogPosts) {
        await createBlogPost(post);
    }
};
async function getAndDisplayBlogPosts() {
    const carouselContainer = document.getElementById('carouselContainer')
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/saraAl')

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
            slide.innerHTML = `
        <h2 class="slide-title">${post.title}</h2>
        <img src="${post.media.url}" alt="${post.media.alt}" class="slider-img">
        `;
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
    setInterval(nextCarouselSlide, 2000);
    DisplaySlide(startOnSlide);
};
(async () => {
    await postBlogPosts();
    await getAndDisplayBlogPosts();
})();