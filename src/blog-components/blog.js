const blogRegex = /{:blogs}([\s\S]*?){:endblogs}/g;
const singleBlogRegex = /{:blog}([\s\S]*?){:endblog}/g;

function createBlogs(mdcontent) {
  const blogs = mdcontent.match(blogRegex);
  const maxBlogsToShow = 3;

  if (blogs) {
    for (let i = 0; i < blogs.length; i++) {
      const blogContent = blogs[i].replace('{:blogs}', '').replace('{:endblogs}', '').trim();

      const singleBlogMatches = blogContent.match(singleBlogRegex);

      if (singleBlogMatches) {
        const blogsHtml = singleBlogMatches
          .slice(0, maxBlogsToShow)
          .map((singleBlogContent) => {
            const titleMatch = singleBlogContent.match(/title="([^"]+)"/);
            const imageMatch = singleBlogContent.match(/image="([^"]+)"/);
            const linkMatch = singleBlogContent.match(/link="([^"]+)"/);

            if (titleMatch && imageMatch && linkMatch) {
              const title = titleMatch[1];
              const image = imageMatch[1];
              const link = linkMatch[1];

              return `
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="blog">
                  <img src="${image}" alt="${title}" class="blogImage">
                  <div class="blogTitleContainer">
                    <p class="blogTitle">${title}</p>
                  </div>
                </a>`;
            }
            return '';
          })
          .join('');

        mdcontent = mdcontent.replace(blogs[i], `<div id="blogContainer">${blogsHtml}</div>`);
      }
    }
  }

  return mdcontent;
}

module.exports = {
  createBlogs,
};
