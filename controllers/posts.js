const Post = require('../models/post');

module.exports = (app) => {
	
	app.get('/', async (req, res) => {
		try {
			const posts = await Post.find({}).lean();
			return res.render('posts-index', { posts });
		} catch (err) {
			console.log(err.message);
		}
	});

	// GET NEW Post Form
	app.get('/posts/new', (req, res) => {
		res.render('posts-new', {});
	});

	// CREATE NEW post
	app.post('/posts/new', async (req, res) => {
		try {
			const post = new Post(req.body);
			await post.save();
			res.redirect('/');
		} catch (error) {
			console.error('Error saving post:', error);
			res.status(500).send('Error saving post');
		}
	});
};
