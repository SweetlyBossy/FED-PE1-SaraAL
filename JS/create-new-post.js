const authKey = localStorage.getItem('authKey');
const userName = localStorage.getItem('userName');

const allUserNames = [];



const createANewPostApiUrl = `https://v2.api.noroff.dev/blog/posts/${userName}`;

if(!authKey){
    alert('You must be signed in to create a post')
    throw new Error('authKey & username is missing');
}


const getOptions = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authKey}`,
            'X-Noroff-API-Key': 'd1e616cb-5b6b-484d-a904-93c9f12cfe71'
        }
    }
};
const form = document.querySelector("form");
const titleInput = document.getElementById("postTitle");
const bodyInput = document.getElementById('bodyText');
const imageUrl = document.getElementById('thumbnailImage');



form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const media = imageUrl.value.trim();

    if (!title || !body) {
        alert("please fill out all form inputs!");
        return;
    }
    const newPost = {
        title,
        body,
        media: media ? { url: media } : null,
    };
    try {
        const response = await fetch(createANewPostApiUrl, {
            method: "POST",
            headers: getOptions().headers,
            body: JSON.stringify(newPost),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Post created successfully");
            form.reset();
            window.location.href = `../HTML/blog-feed-post.html`;
        } else {
            console.error(result);
            alert("Failed To create post: " + (result.errors?.[0]?.message || "unknown error"));
        }
    } catch (error){
        console.error("Error", error);
        alert("an unexpected error occured.");
    }
});