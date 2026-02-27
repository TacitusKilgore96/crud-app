import React, { useState } from 'react'

const PostForm = ({ onSubmit, initialValue }) => {

    const [post, setPost] = useState({
      title: initialValue?.title || "",
      body: initialValue?.body || ""
    });
    //console.log(post)

    const handleChangeInput = (e) => {
      setPost({
        ...post,
        [e.target.name]: e.target.value
      })
    }

    const renderField = (label) => {
        return <div className='grid'>
            <label className="font-bold text-lg">{label}</label>
            <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]} 
            className="bg-gray-200 border border-gray-300 rounded-2xl px-2 py-1 w-70" />
        </div>
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(post);
      setPost({
        title: "",
        body: ""
      })
    }

  return (
    <form onSubmit={handleSubmit} 
    className='bg-amber-100/75 rounded-2xl p-4 gap-5 grid max-w-100'>
       {renderField('Title')} 
       {renderField('Body')}
       <button type='submit' 
       className='max-w-50'
       >Submit</button> 
    </form>
  )
}

export default PostForm
