import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchPost } from "../api/posts"

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, 
    isError, 
    data: post, 
    error 
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

  if(isLoading) return 'loading...'
  if(isError) return `Error: ${error.message}`

  return (
    <div className="flex items-center justify-center p-4">
      <div className="grid w-full gap-5 p-10 mt-5 bg-amber-100/75 rounded-2xl max-w-100">
        <button onClick={() => navigate("/")}>⬅️ back to list posts</button>
        <h1 className="mt-4 mb-2 text-3xl font-bold">{post.title}</h1>
        <p className="text-lg">{post.body}</p>
      </div>
    </div>
  )
}

export default Post
