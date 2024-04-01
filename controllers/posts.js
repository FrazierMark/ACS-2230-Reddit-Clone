const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {
	// GET NEW Post Form
	app.get('/posts/new', (req, res) => {
		res.render('posts-new', {});
	});

	// CREATE NEW post
	app.post('/posts/new', async (req, res) => {
		try {
			if (req.user) {
				const userId = req.user._id;
				const post = new Post(req.body);
				post.author = userId;
				post.upVotes = [];
				post.downVotes = [];
				post.voteScore = 0;

				await post.save();
				const user = await User.findById(userId);
				user.posts.unshift(post);
				await user.save();

				// REDIRECT TO THE NEW POST
				return res.redirect(`/posts/${post._id}`);
			} else {
				return res.status(401).send('Unauthorized'); // UNAUTHORIZED
			}
		} catch (err) {
			console.log(err.message);
			return res.status(500).send('Internal Server Error');
		}
	});

	// SHOW
	app.get('/posts/:id', async (req, res) => {
		const currentUser = req.user;
		try {
			const post = await Post.findById(req.params.id)
				.populate('comments')
				.lean();
			res.render('posts-show', { post, currentUser });
		} catch (err) {
			console.log(err.message);
		}
	});

	// HOME INDEX
	app.get('/', async (req, res) => {
		const currentUser = req.user;
		try {
			const posts = await Post.find({}).lean().populate('author');
			return res.render('posts-index', { posts, currentUser });
		} catch (err) {
			console.log(err.message);
		}
	});

	// SUBREDDIT
	app.get('/n/:subreddit', async (req, res) => {
		const currentUser = req.user;
		const { subreddit } = req.params;
		try {
			const posts = await Post.find({ subreddit }).lean();
			res.render('posts-index', { posts, currentUser });
		} catch (err) {
			console.log(err.message);
		}
	});

	// Upvote and Downvote
	app.put('/posts/:id/vote-up', async (req, res) => {
		try {
			const post = await Post.findById(req.params.id);
			post.upVotes.push(req.user._id);
			post.voteScore += 1;
			await post.save();
			res.status(200).send();
		} catch (err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
	});

	app.put('/posts/:id/vote-down', async (req, res) => {
		try {
			const post = await Post.findById(req.params.id);
			post.downVotes.push(req.user._id);
			post.voteScore -= 1;
			await post.save();
			res.status(200).send();
		} catch (err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
	});
};
