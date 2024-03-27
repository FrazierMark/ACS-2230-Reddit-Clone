const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
	// SIGN UP FORM
	app.get('/sign-up', (req, res) => res.render('sign-up-index'));

	// SIGN UP POST
	app.post('/sign-up', async (req, res) => {
		try {
			// Create User
			const user = new User(req.body);

			// Save user
			await user.save();

			// Create JWT token
			const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
				expiresIn: '60 days',
			});
			res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

			// Redirect
			res.redirect('/');
		} catch (err) {
			console.log(err.message);
			res.status(400).send({ err: err.message });
		}
	});
};
