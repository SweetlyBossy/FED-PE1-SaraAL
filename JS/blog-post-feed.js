const authKey = localStorage.getItem('authKey');
const currentUser = localStorage.getItem('userName');
const isAdmin = currentUser === "flisalisatisa"; 
const blogContainerBox = document.querySelector('.blog-post-box');

const blogApiUrl = "https://v2.api.noroff.dev/blog/posts/saraal";
const currentUserApiUrl = `https://v2.api.noroff.dev/blog/posts/${currentUser}`;

const publicOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FyYWFsIiwiZW1haWwiOiJGbGlzYUxpc2FUaXNhQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ3Njc4MzE1fQ.mYClPx8nuIHBzLSCT26TDLWDecc3dzWvmPye9sGkYos',
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};
const privateOptions = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authKey}`,
            'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
        }
    }
}
function isSignedIn() {
    return !!authKey;
}
async function fetchAllBlogPosts() {
    try {
        const response = await Promise.all([fetch(blogApiUrl, publicOptions),
        isSignedIn() ? fetch(currentUserApiUrl, privateOptions()) : null
        ]);
        const saraalData = await response[0].json();
        const userData = response[1] ? await response[1].json() : { data: [] };
        const allPosts = [...saraalData.data, ...userData.data];
        const sortedPost = allPosts
            .filter(post => post && post.created)
            .sort((a, b) => new Date(b.created) - new Date(a.created));

        renderAllBlogPosts(sortedPost);

    } catch (error) {
        blogContainerBox.innerHTML = `<p> FAILED TO LOAD BLOG POST</p>`;
        console.error("Error fetching blog posts:", error);
    }
}

function renderAllBlogPosts(posts) {
    blogContainerBox.innerHTML = '';

    posts.forEach(post => {
        const divider = document.createElement('div');
        divider.classList.add('blog-post-divider')
        const article = document.createElement('article');
        article.classList.add('blog-post-article-container')
        article.innerHTML = `
            <a href=../HTML/blog-specific-post.html?id=${post.id}>
            <h4 class="blog-post-title">${post.title}</h4>
            <img src="${post.media.url}" alt="${post.media.alt}" class="blog-post-img"/>
            </a>
        `;
        if (isSignedIn()){
           if (isAdmin || post.author?.name === currentUser) {
                const editButton = document.createElement('button');
                editButton.textContent = 'EDIT';
                editButton.classList.add('edit-button');
                editButton.onclick = () => {
                    window.location.href = `../HTML/blog-post-edit.html?id=${post.id}`;
                }; 
                

            const deletebutton = document.createElement('button');
            deletebutton.textContent = 'DELETE';
            deletebutton.classList.add('delete-button');
            deletebutton.onclick = () => deletePost(post.id, post.title);

            article.appendChild(editButton);
            article.appendChild(deletebutton);
           }
        }
        divider.appendChild(article)
        blogContainerBox.appendChild(divider)
    });
}
const deletePost = async (postId, postTitle) => {
    try{
        const response = await fetch(currentUserApiUrl, {
            method: 'GET',
            headers: privateOptions().headers,
        });
        if(!response.ok){
            const errorData = await response.json();
            console.error(`Failed to fetch the posts for user ${currentUser}:`, errorData);
            throw new Error(`Failed to fetch posts ${errorData.message || 'Unkown error, please try again later.'}`);
        }
        const userPosts = await response.json();
        const post = userPosts.data.find(p => p.id === postId);

        if(!post){
            alert("Unauthorized request. You are not the owner of the this post.");
            return;
        }
        if (post.author?.name !== currentUser){
             alert("Unauthorized request. You are not the owner of the this post.");
            return;
        }
        const deleteResponse = await fetch (`${currentUserApiUrl}/${postId}`, {
            method: 'DELETE',
            headers: privateOptions().headers,
        });

        if(!deleteResponse.ok){
            const errorData = await deleteResponse.json();
            console.error(`Failed to delete the post ${postId}:`, errorData);
            throw new Error(`Failed to delete the post ${errorData.message || "Unknown error, please try again later"}`);
        }
        console.log(`Post ${postId}: titled"${postTitle}: deleted successfully!"`)
        fetchAllBlogPosts()
    } catch (error){
        console.error(`Error deleting the post:`, error.message);
        alert(`Unable to delete the post ${postId}`);
    }
}

const createNewPost = document.querySelector('.create-new-post-button');
if (createNewPost) {
    createNewPost.style.display = isSignedIn() ? 'block' : 'none';

    createNewPost.addEventListener('click', () => {
        window.location.href = `/HTML/create-new-post.html`;
    });
}
fetchAllBlogPosts();