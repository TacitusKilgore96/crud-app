import { Route, Routes } from "react-router-dom"
import PostLists from "./pages/PostLists"
import Post from "./pages/Post"
import EditPost from "./pages/EditPost"

function App() {

  return (
    <div>
      <h1 className="text-center font-[1000] text-6xl text-[#FAF9F6] bg-[#1B1212]/50 max-w-4xl mx-auto rounded-b-full p-5">Awesome Sauce Daily</h1>
      <Routes>
        <Route path="/" element={<PostLists />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  )
}

export default App
