const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
	{
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);
commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comments'))
  .pre('find', Populate('comments'));

module.exports = model('Comment', commentSchema);
