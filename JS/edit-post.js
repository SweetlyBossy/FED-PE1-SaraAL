const postId = new URLSearchParams(window.location.search).get("id");
if (!postId) {
    console.error('No post ID found');
    throw new Error('Missing post ID in URL params');
}

const currentUser = localStorage.getItem('userName'); 
const blogApiUrl = `https://v2.api.noroff.dev/blog/posts/${currentUser}/${postId}`;
const authKey = localStorage.getItem("authKey");
const userName = localStorage.getItem("userName");

if (!authKey || !userName) {
    console.error('You must be signed in to create a post')
    throw new Error('authKey or username is missing');
}

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authKey}`,
        'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
    }
};

const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById('bodyText');
const imageUrl = document.getElementById('blogPostImage');

async function fetchPostData() {
    try {
        const response = await fetch(blogApiUrl, { headers: options.headers });
        const result = await response.json();
        if (response.ok) {
            const post = result.data;

            if (post.author?.name !== userName) {
                form.style.display = "none";
                
                const warningText = document.createElement('h1');
                warningText.classList.add('warning-title');
                warningText.textContent = 'Unathorized request, you do not own this blog post';
                warningText.style.color = "red";
                
                const returnButton = document.createElement('button');
                returnButton.classList.add('return-button');
                returnButton.textContent = 'HOME';
                returnButton.addEventListener('click', () =>{
                    window.location.href = '../index.html'
                })

                form.parentElement.appendChild(warningText);
                return;
            }
            titleInput.value = post.title;
            bodyInput.value = post.body;
            imageUrl.value = post.media?.url || "";
        } else {
            alert("Failed to load Post: " + (result.errors?.[0]?.message || "An unknown error has occured, please try again later or contact your blog provider!"));
        }
    } catch (error) {
        console.error("failed to fetch post", error);
        alert("An error has occured, please try again later!")
    }
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const media = imageUrl.value.trim();

    if (!title || !body) {
        alert("Please fill out all fields!");
        return;
    }
    const updatedPost = {
        title,
        body,
        media: media ? { url: media } : null,
    };
    try {
        const response = await fetch(blogApiUrl, {
            method: "PUT",
            headers: options.headers,
            body: JSON.stringify(updatedPost),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Post updated successfully");
            window.location.href = `../blog-specific-post.html?id=${postId}`;
        } else {
            console.error(result);
            alert("Failed to update post: " + (result.errors?.[0]?.message || "unknown error"));
        }
    } catch (error) {
        console.error("Error", error);
        alert("An unexpected error occured");
    }
});
fetchPostData();