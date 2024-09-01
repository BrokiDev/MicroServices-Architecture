const CommentList = ({ comments }:{comments:{id:string; content:string; status:string}[]}) => {
  const uniqueComments = comments.filter((comment, index, self) =>
    index === self.findIndex((c) => c.id === comment.id)
  );

  const renderedComments = uniqueComments.map((comment) => {
    if(comment.status === 'pending') {
      comment.content = 'This Comment is awaiting moderation'
    }
    if(comment.status === 'rejected') {
      comment.content = 'This Comment has been rejected';
    }


    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;