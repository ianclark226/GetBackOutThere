const verifyToken = require('../middleware/verifyToken')
const Comment = require('../models/Comment.js')
const commentController = require('express').Router()


// get all the comments from the post
commentController.get('/:listingId', async(req, res) => {
    try {
        const comments = await Comment
        .find({ listing: req.params.listingId })
        .populate('author', '-password')

    return res.status(200).json(comments)
    } catch(error) {
        return res.status(500).json(error.message)
    }
})

// create a comment
commentController.post('/', verifyTOken, async(req, res) => {
    try {
        const createdComment = await (await Comment.create({ ...req.body, author: req.user.id }))
            .populate('author', '-password')

        return res.status(201).josn(createdComment)
    } catch(error) {
        return res.status(500).json(error.message)
    }
})

// delete a comment
commentController.delete('/:commentId', verifyToken, async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)

        if(comment.author.createFromHexString() === req.user.id) {
            await Comment.findByIdAndDelete(req.params.commentId)
            return res.status(200).json({ msg: "Comment has been successfully deleted" })
        } else {
            return res.status(403).json({ msg: "You only delete your own comments" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = commentController