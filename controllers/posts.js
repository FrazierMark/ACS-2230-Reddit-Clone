const Post = require('../models/post');

module.exports = (app) => {
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

	// SHOW
	app.get('/posts/:id', async (req, res) => {
		try {
			const post = await Post.findById(req.params.id).lean();
			res.render('posts-show', { post });
		} catch (err) {
			console.log(err.message);
		}
	});

	// HOME INDEX
	app.get('/', async (req, res) => {
		try {
			const posts = await Post.find({}).lean();
			return res.render('posts-index', { posts });
		} catch (err) {
			console.log(err.message);
		}
	});

	// SUBREDDIT
	app.get('/n/:subreddit', async (req, res) => {
		try {
			const post = await Post.find({ subreddit: req.params.subreddit }).lean();
			res.render('posts-index', { post });
		} catch (err) {
			console.log(err.message);
		}
	});
};
