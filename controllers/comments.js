const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
	// CREATE Comment
	app.post('/posts/:postId/comments', async (req, res) => {
		try {
			// INSTANTIATE INSTANCE OF MODEL
			const comment = new Comment(req.body);

			// SAVE INSTANCE OF Comment MODEL TO DB
			await comment.save();

			// Find the post by ID
			const post = await Post.findById(req.params.postId);

			// Add the comment to the post
			post.comments.unshift(comment);

			// Save the post
			await post.save();

			// Redirect
			res.redirect('/');
		} catch (err) {
			console.log(err);
		}
	});
};
