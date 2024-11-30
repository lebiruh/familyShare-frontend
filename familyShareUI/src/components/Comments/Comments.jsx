import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { IoSendSharp } from "react-icons/io5";
import { addComment, getComments } from "../../helpers/comments";
import './comments.css';


const Comment = ({ comment }) => {

  const { firstName, content, createdAt } = comment;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Avatar sx={{ mr: 1, ml: 2 }} />
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {firstName}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Typography variant="caption" color="text.secondary">
          {moment(createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

const Comments = ({ userId, postId }) => {

  const [newComment, setNewComment] = useState({userId: userId, postId: postId, content:""});

  const queryClient = useQueryClient();

  const commentsQuery = useQuery({ queryKey: ['comments', postId], queryFn: () => getComments(postId), enabled: !!postId})

  console.log("comments query: ", commentsQuery);

  const comments = commentsQuery.data;

  console.log("comments are: ", comments);

  const handleChange = (e) => {
    setNewComment(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const commentMutation = useMutation({
      mutationFn: (newComment) => addComment(newComment),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['comments', postId]})}
    })

  const handleAddComment = (event) => {
    event.preventDefault();
    //TODO: Handle adding new comment
    commentMutation.mutate(newComment, postId);
    setNewComment({userId: userId, postId: postId, content:""});
  };

  return (
    <div className='comments_form_container'>
      <hr />
      <form className="comments_form" onSubmit={handleAddComment}>
        <input
          value={newComment.content}
          onChange={handleChange}
          name="content"
          placeholder="Add a comment..."
        />
        <button className="comments_form_button" type="submit">
          <IoSendSharp />
        </button>
      </form>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments