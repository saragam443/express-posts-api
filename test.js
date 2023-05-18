function minifyCode(code) {
    return code
      .replace(/\s+/g, "") // Replace multiple spaces with a single space
      .replace(/\s*\/\/.*\n/g, "") // Remove single-line comments
      .replace(/\/\*(.|[\r\n])*?\*\//g, "") // Remove multi-line comments
      .replace(/\n/g, "") // Remove newlines
      .trim(); // Remove leading/trailing whitespace
  }
  
  const code = `
  module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    // getPost,
  }; 
  `;
  
  const minifiedCode = minifyCode(code);
  
  console.log(minifiedCode);
  