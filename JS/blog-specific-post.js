const blogContainerBox = document.querySelector('.blog-post-box');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const blogApiUrl = `https://v2.api.noroff.dev/blog/posts/${postId}`;

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos',
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};


async function fetchSpecificBlogPost() {
    if(!postId){
        blogContainerBox = `<p> No matching blog post ID</p>`;
        return;
    }
    try {
        const response = await fetch(blogApiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTPS ERROR!! STATUS ${response.status}`);
        }
        const post = await response.json();
        console.log("API RESPONSE:", post)
        renderSpecificBlogPost(post);
        blogContainerBox.innerHTML= `<p> No blog post found with the ID: ${postId}</p>`;
    } catch (error) {
        blogContainerBox.innerHTML = `
        <p> FAILED TO FETCH POST, 404 NO LEGS FOUND!</p>`;
        console.error("Error fetching post:", error)
    }
}

function renderSpecificBlogPost(post) {
    blogContainerBox.innerHTML = '';
    
    const blogPostArticle = document.createElement('article');
    blogPostArticle.classList.add('blog-post-article-container');
    blogPostArticle.innerHTML = post.body;
    blogContainerBox.appendChild(blogPostArticle);
}
fetchSpecificBlogPost();