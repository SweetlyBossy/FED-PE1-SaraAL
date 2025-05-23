const blogContainerBox = document.querySelector('.blog-post-box');

const blogApiUrl = "https://v2.api.noroff.dev/blog/posts/saraal";

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos',
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};

async function fetchAllBlogPosts() {
    try {
        const response = await fetch(blogApiUrl, options);
        const { data } = await response.json();

        renderAllBlogPosts(data);
    } catch (error) {
        blogContainerBox.innerHTML = `<p> FAILED TO LOAD BLOG POST</p>`;
        console.error("Error fetching blog posts:", error);
    }
}

function renderAllBlogPosts(posts){
    blogContainerBox.innerHTML = '';

    posts.forEach(post => {
        const divider = document.createElement('div');
        divider.classList.add('blog-post-divider')
        const article = document.createElement('article');
        article.classList.add('blog-post-article-container')
        article.innerHTML= `
            <a href=../HTML/blog-specific-post.html?id=${post.id}>
            <h4 class="blog-post-title">${post.title}</h4>
            <img src="${post.media.url}" alt="${post.media.alt}" class="blog-post-img"/>
            </a>
        `;
        divider.appendChild(article)
        blogContainerBox.appendChild(divider)
    });
}
fetchAllBlogPosts();