import React from 'react'
import classes from './Comment.module.css'
import { format } from 'timeago.js'
import { useSelector } from 'react-redux'
import { BsTrash } from 'react-icons/bs'
import { request } from '../../util/fetchAPI'
import { BASE_URL } from '../../util/fetchAPI'
import person from '../../assets/person.webp'

const Comment = ({ comment, setComments }) => {
    const { user, token } = useSelector((state) => state.auth)

    const handleDeleteComment = async() => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            }
            await request(`/comment/${comment?._id}`, 'DELETE', options)
            setComments((prev) => {
                return [...prev].filter((c) => c?._id !== comment?._id)
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.left}>
                {/* <img src={comment?.author?.profileImg ? `https://get-back-out-there.onrender.com/images/${comment?.author?.profileImg}` || `https://get-back-out-there.onrender.com/images/${comment?.author?.profileImg}` : person} alt="Profile Img"/> */}
                <img src={comment?.author?.profileImg ? `${BASE_URL}/images/${comment?.author?.profileImg}` : person} alt="Profile Img"/>
                <div className={classes.userData}>
                    <h4>{comment?.author?.username}</h4>
                    <span className={classes.timeago}>{format(comment?.createdAt)}</span>
                </div>
                <span>{comment?.text}</span>
            </div>
            <div className={classes.right}>
                {user?._id === comment?.author?.id && (
                    <BsTrash className={classes.trashicon} onClick={handleDeleteComment} />
                )}
            </div>
        </div>
    </div>
  )
}

export default Comment