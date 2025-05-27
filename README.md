## Brief
You have been hired to build a front-end user interface for an existing API blogging application.  The client has asked for a responsive web application that allows users to view dynamic blog posts.  You will use your own account that you create to act as the owner to test the functionality.  When you submit the project, your client needs to be able to register, login and manage their blog posts.

## Client
You may come up with your own fictional (pretend) client that you are building your web application for, with a theme, backstory and branding of your choosing.  
If you prefer not to create a fictional client, you may use the details below:
 
Example Client:
- Name	HotView Labs
- Size	30 employees
- Location	Worldwide
- Mission	Provide the most accurate and up-to-date insights to tech leaders across the world.
 
## Terminology
User – a person visiting your site that is not logged in.  
Owner - the logged in manager of the blog.

## Pages and User Stories
NOITE: The below user stories and pages are required

The respective endpoints associated with the pages are supplied alongside the name of the page. 
Note that for the endpoints, the <name> will be replaced by your registered username and <id> will be replaced by the ID value of a given blog post item.
On the next line, the sitemap path defines the structure of the files; e.g. “/account/login.html” refers to the login.html page inside the ‘account’ folder. 
Please see the following pages and their respective user stories required by the client:

## Blog Feed Page - GET /blog/posts/<name>
/index.html
 
The Blog Feed Page needs to consist of a carousel and a list of at least 12 posts.

- As a user, I want to see an interactive banner carousel on the blog feed page, so that I can view a rotation of the 3 latest posts.
- As a user, I want to click on the previous or next button in the carousel to animate
and reveal another post, to ensure I can see different posts easily.
- As a user, I want the carousel to return to the first post after reaching the end of the list, and vice versa when clicking previous on the first post.
- As a user, I want to click on a button for each carousel item, taking me to the blog post page to read more.
- As a user, I want to view a list of the 12 latest posts in a responsive thumbnail grid on the blog feed page, so I can easily select which post to read.
- As a user, I want each thumbnail image in the blog post feed to be clickable, taking me to the blog post page to read more about that specific blog post.

## Specific Blog Post Page - GET /blog/posts/<name>/<id>
/post/index.html
 
The Specific Blog Post Page features more details about a specific blog post that was navigated to from the thumbnail of the Blog Feed Page.

- As a user, I want to see a responsive layout showing the post’s title, author, publication date, image banner, and main content fetched from the API.
- As a user, I want each specific blog page to have a “share” icon that has shareable URL including a query string or hash parameter that contains the post ID, so I can share the post with others easily.

### Create Blog Post Page - POST /blog/posts/<name>
/post/create.html
 
The Create Blog Post Page features a form that accepts inputs from the owner in order to create a blog post.

- As the owner, I want the blog post create page to be available only when logged in, to ensure no unauthorized blog posts are created.
- The blog post form needs to accept a title, body and media inputs and be visible on the Blog Feed Page once created.
 
## Blog Post Edit Page - PUT /blog/posts/<name>/<id>
DELETE /blog/posts/<name>/<id>
 
/post/edit.html
 
The Blog Post Edit Page features a form that gives an owner the ability to edit or delete a post.

- As the owner, I want the blog post edit page to be available only for me when logged in, to ensure no unauthorized edits or deletions can be made to my posts.
- As the owner, I want a delete button on the edit form that sends a DELETE request to the API for this post ID on the edit page, so I can easily remove my post if needed.
- As the owner, I want a validated edit form that allows me to update the title, body content, or image by sending a POST request to the API for this post ID, ensuring I can keep my posts up to date easily.

## Account Login Page - POST /auth/login
/account/login.html
 
- As the owner, I want a validated login form that allows me to request and save a token to my browser by entering my email and password, allowing me to manage posts.
 
## Account Register Page - POST /auth/register
/account/register.html
 
- As the owner, I want a validated register form that allows me to create a new account by entering my email and password.

## Technology used
- In this project I was able to use HTML, CSS and Javascript. 
- I used VS code as the editor tool.
- I used Wave and lighthouse to keep track of all the different SEOs and performance metrics.
- I used sqoouosh to be able to scale down the file size of all images, before uploading to imgHippo. 
- I used imgHippo to host my images to get a url for them to use.
- I used the Noroff API to interact with.
