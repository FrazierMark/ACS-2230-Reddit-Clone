const Post = require('../models/post');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.render('home');
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
