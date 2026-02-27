import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import PostForm from "./PostForm"
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {
    // successful post
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts']});
            console.log("success!")
        }
    });

    const handleAddPost = (post) => {
        createPostMutation.mutate({
            id: uuidv4(),
            ...post
        })
    }

  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold mb-4 text-[#FAF9F6]">What's on your mind today?</h2>
      <PostForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  )
}

export default AddPost
