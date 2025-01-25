let blogs = [];
let currentBlogId = null;

function showAddBlogForm() {
    document.getElementById('blog-form-container').style.display = 'flex';
    document.getElementById('blog-form').reset();
    currentBlogId = null;
}

function saveBlog(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];

    const blog = {
        id: currentBlogId !== null ? currentBlogId : Date.now(),
        title,
        description,
        content,
        imageUrl: URL.createObjectURL(image),
        likes: 0,
        bookmarked: false
    };

    if (currentBlogId !== null) {
        blogs = blogs.map(b => b.id === currentBlogId ? blog : b);
    } else {
        blogs.push(blog);
    }

    document.getElementById('blog-form-container').style.display = 'none';
    displayBlogs();
}

function displayBlogs() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';

    blogs.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';

        blogCard.innerHTML = `
            <img src="${blog.imageUrl}" alt="${blog.title}">
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
            <button onclick="editBlog(${blog.id})">Edit</button>
            <button onclick="likeBlog(${blog.id})">Like (${blog.likes})</button>
            <button onclick="bookmarkBlog(${blog.id})">
                ${blog.bookmarked ? 'Unbookmark' : 'Bookmark'}
            </button>
        `;

        console.log(`Buttons for blog ${blog.title} created`);
        blogList.appendChild(blogCard);
    });
}


function deleteBlog(id) {
    blogs = blogs.filter(blog => blog.id !== id);
    displayBlogs();
	
}

function editBlog(id) {
    const blog = blogs.find(b => b.id === id);
    currentBlogId = id;

    document.getElementById('title').value = blog.title;
    document.getElementById('description').value = blog.description;
    document.getElementById('content').value = blog.content;
    document.getElementById('blog-form-container').style.display = 'flex';
}

function likeBlog(id) {
    const blog = blogs.find(b => b.id === id);
    blog.likes += 1;
    displayBlogs();
}

function bookmarkBlog(id) {
    const blog = blogs.find(b => b.id === id);
    blog.bookmarked = !blog.bookmarked;
    displayBlogs();

}                                            