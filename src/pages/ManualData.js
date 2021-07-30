import { useState } from "react"
import uuid from 'react-uuid'

const currentTime = new Date().getTime()

const ManualData = () => {
  const [post, setPost] = useState({
    key:'', 
    title:''
  })

  const [editPost, setEditPost] = useState({
    key:'', 
    title:''
  })

  const [uniqueKey, setUniqueKey] = useState(0)
  const [postList, setPostList] = useState([])
  const [editState, setEditState] = useState(false)

  const handleChange = (e) => {
    switch (editState) {
      case false:
        setPost(() => {
          return {
            key: uniqueKey, 
            [e.target.name]: e.target.value 
          }
        })
        break

      case true:
        setEditPost(() => {
          return {
            ...editPost,
            [e.target.name]: e.target.value
          }
        })
        break
      default:
        return post
      }
  }

  const handleEdit = (key) => {
    setEditState(!editState)
    const foundPost = postList.find((post) => post.key === key)
    setEditPost(() => {
      return ({
        key: key,
        title: foundPost.title
      })
    })
  }

  const handleAdd = () => {
    setUniqueKey(uuid())

    setPostList((prev) => {
      return [...prev, post]
    })

    setPost(() => {
      return { 
        key:'', 
        title:''
      }})
  }

  const handleSave = () => {
    const updateList = postList.map((post) => {
      if(post.key === editPost.key){
        return ({
            key:editPost.key,
            title:editPost.title
          }
        )
      }else
        return {
          key: post.key,
          title:post.title
        }
    })
    setPostList(updateList)
  }

  const handleDelete = (key) => {
    const updatedPostList = postList.filter((post) => post.key !== key)
    setPostList(() => {
      return updatedPostList
    })
  }

  return(
    <>
      { 
        !editState ?
          <>
            <input type="text" name='title' onChange={handleChange} value={post.title} />
            <button onClick={ handleAdd }>Add Post</button>
          </>
        :
          <>
            <input type="text" name='title' onChange={handleChange} value={editPost.title} /> 
            <button onClick={ handleSave }>Save Post</button>
          </>
      }

      {
        postList.map((post) => {
          return (
            <div key={post.key}>
              <p>{post.title}</p>
              <button onClick={() => {handleEdit(post.key)}}>Edit</button>
              <button onClick={() => {handleDelete(post.key)}}>Delete</button>
            </div>
          )
        })
      }
    </>
  )
}

export default ManualData