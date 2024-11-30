/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { FaRegCommentAlt } from "react-icons/fa";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { addLike, getLikes, removeLike } from '../../helpers/likes';
// import DeletePosts from '../DeletePosts/DeletePosts';
import Comments from '../Comments/Comments';
import "./post.css";
// import { deletePost } from '../../helpers/posts';



const Post = ({data, userId, handleDelete}) => {

  const [commentsOpen, setCommentsOpen] = useState(false)
  // const [deleteOpen, setDeleteOpen] = useState(false)
  // const [disliked, setDisliked] = useState(false)

  const postBy = data?.firstName 

  const postId = data?.id;

  const posterId = data?.userId;

  // const familyId = data?.familyId

  const likesQuery = useQuery({ queryKey: ['likes', postId], queryFn: () => getLikes(postId), enabled: !!postId})

  const numberOfLikesCount = likesQuery?.data?.length;

  // console.log("Number of likes on post: ", numberOfLikesCount);

  const likeUserIds = likesQuery?.data?.map(data => data.userId);

  // const likeUserIds = [ 2, 3]

  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
      mutationFn: () => addLike(postId, userId),
      onSuccess: () => {
        // setDisliked(false);
        queryClient.invalidateQueries({queryKey: ['likes', postId]})}
    })

  const removeLikeMutation = useMutation({
      mutationFn: () => removeLike(postId, userId),
      onSuccess: () => {
        // setDisliked(false);
        queryClient.invalidateQueries({queryKey: ['likes', postId]})
      },
      // enabled: !!disliked
    }) 


  const handleLike = () => {
    // console.log("PostId: " + " " + postId + "is liked by " + userId);
    // // setDisliked(true);
    addLikeMutation.mutate({postId, userId});
    // console.log("HandleLike PostId: " + " " + postId + " " + disliked);
  }

  const handleDislike = () => {
    // setDisliked(true);
    // console.log("PostId: " + " " + postId + "is disliked by " + userId);
    removeLikeMutation.mutate({postId, userId});
    // console.log("Handle Dislike PostId: " + " " + postId + + " " + disliked);
  }


  const url = `${import.meta.env.VITE_AWS_URL}/${data?.image}`


  return (
    <Card sx={{marginTop: 2, marginBottom: 2, position:"relative"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#1976d2' }} aria-label="user">
            {postBy[0]}
          </Avatar>
        }
        action={ posterId === userId ? 
          (<div className='delete_icon_container' onClick={() => handleDelete(postId)}>
            <Delete />
          </div>) : null
        }
        title={postBy}
        subheader= {moment(data.createdAt).fromNow()}
      />
      {/* {deleteOpen && <DeletePosts />} */}
      {data.image && <CardMedia
        component='img'
        height="20%"
        // image={`/upload/${data?.image}`}
        image={url}
        alt="Paella dish"
        
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites" onClick={handleLike}> */}
        <div className='like_and_comment_container'>
          {/* <div className='post_likes'> */}
            {likeUserIds?.includes(userId) ? 
              // <IconButton aria-label="add to favorites" onClick={handleDislike}>
              <div className='post_likes' onClick={handleDislike}>
                <Favorite htmlColor='red' />
                <span>
                  {
                  // numberOfLikesCount === 0 || numberOfLikesCount === undefined ?
                  //   "like" : 
                    numberOfLikesCount === 1 ?
                    `${numberOfLikesCount} like` :
                    `${numberOfLikesCount} likes`
                  }
                </span>
              </div> : 
              // <IconButton aria-label="add to favorites" onClick={handleLike}>
              <div className='post_likes' onClick={handleLike}>
                  
                  <FavoriteBorder />
                  {/* // </IconButton> */}
                  <span>
                  {numberOfLikesCount === 0 || numberOfLikesCount === undefined ?
                    "Like" : 
                    numberOfLikesCount === 1 ?
                    `${numberOfLikesCount} like` :
                    `${numberOfLikesCount} likes`
                  }
                </span>
              </div>
            }
                    
            {/* </IconButton> */}
            {/* <span>
              {numberOfLikesCount === 0 || numberOfLikesCount === undefined ?
                "like" : 
                numberOfLikesCount === 1 ?
                `${numberOfLikesCount} like` :
                `${numberOfLikesCount} likes`
              }
            </span>
          </div> */}
          <div className='post_comments' onClick={() => setCommentsOpen(!commentsOpen)}>
            {/* <IconButton sx={{ ml: 2}} aria-label="comments" onClick={() => setCommentsOpen(!commentsOpen)}> */}
              <FaRegCommentAlt />          
            {/* </IconButton> */}
            <span >
                Comment
            </span>
          </div>
        </div>
      </CardActions>
      {commentsOpen && <Comments userId={userId} postId={postId}/>}
    </Card>
  )
}

export default Post;