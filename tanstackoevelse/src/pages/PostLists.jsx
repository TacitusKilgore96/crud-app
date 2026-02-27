import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deletePost, fetchPosts } from "../api/posts"
import AddPost from "../components/AddPost"
import { useNavigate } from "react-router-dom"
// just like animals, animals like animals-mals
import { fetchRandomDog, fetchRandomAnimal } from "../api/Animals"

const PostLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
// om tanstack: med bare få linjer kode, får vi alt hvad vi skal bruge. Loading, error, data.
  const { isLoading, 
    isError, 
    data: posts, 
    error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  });

  // animalz
  const { data: dogData, refetch: refetchDog } = useQuery({
    queryKey: ["randomDog"],
    queryFn: fetchRandomDog
  });

  const { data: animalData, refetch: refetchAnimal } = useQuery({
    queryKey: ["randomAnimal"],
    queryFn: fetchRandomAnimal
  });
  //END animalz

//END om tanstack

  const deletePostMutation = useMutation ({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts']});
    }
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id)
  }

  // til refresh animal knappen
  const handleRefreshAnimals = () => {
    refetchDog();
    refetchAnimal();
  }

  if(isLoading) return 'loading...'
  if(isError) return `Error: ${error.message}`

  return (
    <div className="flex gap-4 p-40">
      <div className="flex-1">
        <AddPost />
        {posts.map(post =>(
          <div key={post.id} className="bg-gray-200/80 rounded-2xl p-4 mb-2 w-100">
            <h4 onClick={() => navigate(`/post/${post.id}`)} 
            className="cursor-pointer font-bold">{post.title}
            </h4>
            <p className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-2 my-2">{post.body}</p>
            <button onClick={() => navigate(`/post/${post.id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
      
      <div className="flex-1 bg-gray-200/80 p-5 rounded-2xl max-w-120 h-full">
        <h2 className="text-3xl font-extrabold p-4">
          Bored? Generate dogs here
          </h2>
        {dogData && (
          <div>
            <h3 className="text-2xl p-4">Wrong animal names only</h3>
            <div className="h-100 p-2">
              <img src={dogData.message} alt="Random dog" className="w-full h-full object-cover rounded-2xl"/>
            </div>
          </div>
        )}
        {animalData && (
          <div className="text-center">
            <p className="text-2xl font-[600]">{animalData.city}</p>
            <button onClick={handleRefreshAnimals}>New Animal</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostLists
