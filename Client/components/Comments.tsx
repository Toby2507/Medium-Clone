import { Comment } from '@/interfaces';
import React from 'react';

const Comments = ({ comments }: { comments: Comment[]; }) => {
  return (
    <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 gap-2'>
      <h3>Comments</h3>
      <hr className='pb-2 text-4xl' />
      {comments.map((comment: Comment) => (
        <div key={comment._id}>
          <p>
            <span className='text-yellow-500'>{comment.name}: </span>
            {comment.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;