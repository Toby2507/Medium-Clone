import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface formInterface {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const AddComment = ({ id }: { id: string; }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<formInterface>();
  const [submitted, setSubmitted] = useState<boolean>(true);
  const onSubmit: SubmitHandler<formInterface> = async data => {
    try {
      await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log(data);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitted(false);
    }
  };

  return (
    <>
      {submitted ? (
        <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>Thank you for submitting your comment!</h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-2xl p-5 mb-10 mx-auto">
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3 >
          <h3 className="text-3xl font-bold">Leave a comment below!</h3>
          <hr className="py-3 mt-2" />
          <input type="hidden" value={id} {...register("_id")} />
          <label className="block mb-5" htmlFor="">
            <span className="text-gray-700">Name</span>
            <input {...register("name", { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus:ring ring-yellow-500" type="text" placeholder="John Appleseed" />
          </label>
          <label className="block mb-5" htmlFor="">
            <span className="text-gray-700">Email</span>
            <input {...register("email", { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus:ring ring-yellow-500" type="email" placeholder="John Appleseed" />
          </label>
          <label className="block mb-5" htmlFor="">
            <span className="text-gray-700">Comment</span>
            <textarea {...register("comment", { required: true })} className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full focus:outline-none focus:ring ring-yellow-500" rows={8} placeholder="John Appleseed" />
          </label>;
          {/* Error prompts */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- The Name Field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">- The Email Field is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">- The Comment Field is required</span>
            )}
          </div>
          <input className='bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' type="submit" />
        </form >
      )}
    </>
  );
};

export default AddComment;