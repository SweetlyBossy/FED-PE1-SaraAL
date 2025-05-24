const blogContainerBox = document.querySelector('.blog-post-box');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const blogApiUrl = "https://v2.api.noroff.dev/blog/posts/saraal";

const getOptions = () => {
    const authKey = localStorage.getItem('authKey');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos'}`,
            'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
        }
    }
};

async function fetchSpecificBlogPost() {
    if (!postId) {
        blogContainerBox.innerHTML = `<p> No matching Blog Post ID: ${postId}`;
        return;
    }
    try {
        const response = await fetch(blogApiUrl, getOptions());
        const result = await response.json();
        console.log("API RESULTS:", result);

        const matchingPost = result.data.find(post => post.id === postId);
        if (!matchingPost) {
            throw new Error("No blog post found with this ID");
        }
        renderSpecificBlogPost(matchingPost);
    } catch (error) {
        blogContainerBox.innerHTML = `<p> FAILED TO FETCH POST</p>`;
        console.error("ERROR FETCHING POST", error);
    }
}

function renderSpecificBlogPost(post) {
    blogContainerBox.innerHTML = '';

    const blogPostArticle = document.createElement('article');
    blogPostArticle.classList.add('blog-post-article-box');
    blogPostArticle.innerHTML = post.body;
    blogContainerBox.appendChild(blogPostArticle);
}

fetchSpecificBlogPost();