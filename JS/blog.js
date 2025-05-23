import { initialBlogPosts } from './back-up-file.js';

const createBlogPost = async (post) => {
    try {
        const response = await fetch(blogApiUrl, {
            method: "POST",
            headers: options.headers,
            body: JSON.stringify(post)
        });
        const data = await response.json();
        if (!response.ok) {
            console.log("API response:", data)
            throw new Error(data.message || "Failed to create blog post.");
        }
        console.log("Post created successfully", data);
    } catch (error) {
        console.error("Error creating post", error.message);
    }
};
const deletePost = async (postId) => {
    try {
        const response = await fetch(`${blogApiUrl}/${postId}`, {
            method: 'DELETE',
            headers: options.headers,
        });
        if (!response.ok) {
            erData = await response.json();
            console.error(`Failed to delete the post ${postId}:`, erData.message);
            throw new Error(`Failed to delete the post${erData.message}`);
        }
        console.log(`Post ${postId} & ${post.title} DELETED!`)
    } catch (error) {
        console.error(`Error deleting post ${postId}`, error.message)
    }
}

// const postIdToDelete = '';
    deletePost(postIdToDelete);
const fetchAllPostIds = async () => {
    try {
        const response = await fetch(blogApiUrl, options);
        if (!response.ok) {
            throw new Error(`failed to fetch posts: ${response.status}`);
        }
        const result = await response.json();
        const postIds = result.data.map(post => post.id);
        console.log('Post IDs:', postIds);
        return postIds;
    } catch (error) {
        console.error("Error fetching post ids:", error.message);
    }
};
fetchAllPostIds();

const fetchExistingPost = async () => {
    try {
        const response = await fetch(blogApiUrl, options);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || `Failed to 
        fetch existing post. Status: ${response.status}`)
        }
        return result.data || [];
    } catch (err) {
        console.error("error fetching existing posts:", err.message);
        return [];
    }

};

const cleanUpPostFeed = async () => {
    const posts = await fetchExistingPost();
    const seen = new Map();
    const duplicate = [];

    for (const post of posts) {
        const titleKey = post.title?.trim().toLowerCase();
        const mediaUrl = post.media?.url || '';
        const key = `${titleKey}|${mediaUrl}`;

        if (seen.has(key)) {
            duplicate.push(post.id);
        } else {
            seen.set(key, post.id);
        }
    }
    for (const id of duplicate) {
        try {
            const deleteResponse = await fetch(`${blogApiUrl}/${id}`, {
                method: 'DELETE',
                headers: options.headers
            });
            if (!deleteResponse.ok) {
                const errData = await deleteResponse.json();
                console.error(`could not delete ${id}:`, errData.message);
            } else {
                console.log(`deleted duplicate: ${id}`);
            }
        } catch (err) {
            console.error(`could not delete ${id}:`, err.message);
        }
    }
}

const postBlogPosts = async () => {

    const existingPosts = await fetchExistingPost();

    const existingKeys = existingPosts.map(post => `${post.title?.trim().toLowerCase()}|${post.media.url}`
    );

    for (const post of initialBlogPosts) {
        const key = `${post.title?.trim().toLowerCase()}|${post.media.url}`;
        if (!existingKeys.includes(key)) {
            await createBlogPost(post);
        } else {
            console.log(`Post ${post.title} already exists.`);
        }
    }
};
(async () => {
    await cleanUpPostFeed();
    await postBlogPosts();
})();