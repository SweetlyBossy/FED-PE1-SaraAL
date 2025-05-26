const blogContainerBox = document.querySelector('.blog-post-box');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
let currentPost = null;

const blogApiUrl = "https://v2.api.noroff.dev/blog/posts/winewhisperer";


const getOptions = () => {
    const authKey = localStorage.getItem('authKey');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authKey}`,
            'X-Noroff-API-Key': '339be548-4eae-4260-bcd5-597493568802'
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


        const matchingPost = result.data.find(post => post.id === postId);
        if (!matchingPost) {
            throw new Error("No blog post found with this ID");
        }
        currentPost = matchingPost;
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

document.addEventListener('click', function (event) {
    if (event.target.closest('.share-button')) {
        const postTitle = document.querySelector('.blog-post-title')?.textContent || currentPost?.title || "Check out this post!";
        const sharingUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: postTitle,
                text: "Check out this blog post from Wine Whisperer!",
                url: sharingUrl
            }).catch(err => console.error("Sharing failed:", err));
        } else {
            navigator.clipboard.writeText(sharingUrl)
                .then(() => alert("Link to page is now copied!"))
                .catch(err => console.error("Clipboard error:", err));
        }
    }
});

fetchSpecificBlogPost();