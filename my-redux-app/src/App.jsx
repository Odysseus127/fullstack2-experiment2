import { useSelector, useDispatch } from 'react-redux';
import { likePost, addPost,deletePost, selectPosts, 
  selectTotalLikes,selectTotal,selectPlatformCounts} from './app/slices/postSlice';

import { toggleTheme , selectTheme} from './app/slices/platformSlice';
import { useState } from 'react';


export default function App() {
  const dispatch = useDispatch();

  // Reading state slices directly 
  const posts = useSelector(selectPosts);
  const theme = useSelector(selectTheme);

  const totalPosts = useSelector(selectTotal);
  const totalLikes = useSelector(selectTotalLikes);
  const platformCounts = useSelector(selectPlatformCounts);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Facebook');


  const handleCreatePost = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      dispatch(
        addPost({
          id: Date.now().toString(),
          title,
          content,
          platform, 
          likes: 0,
        })
      );
      // Reset form
      setTitle('');
      setContent('');
      setPlatform('Facebook');
    }
  };


  return (
    <div className={`page ${theme}`}>
      <div className="container">
        <h1 className="title">POST STATE MANAGEMENT USING REDUX TOOLKIT</h1>

        <div className="theme-toggle">
          <button onClick={() => dispatch(toggleTheme())}>
            Toggle Theme
          </button>
        </div>

        <form className="card" onSubmit={handleCreatePost}>
          <h2>Create a Post</h2>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>

          <button type="submit" className='add-post-btn'>Add Post</button>
        </form>

        <h2 className=" posts-heading">DashBoard Statistics</h2>
        <div className='dashboard-stats'>
          <div className="stat-card"> 
            <h3>Total Posts  </h3>
            <span>{totalPosts}</span>
          </div>
      
        <div className="stat-card">
          <h3>Total Likes</h3>
          <span>{totalLikes}</span>
        </div>

        <div className="stat-card">
          <h3>Facebook Posts</h3>
          <span>{platformCounts.Facebook}</span>
        </div>
        <div className="stat-card">
          <h3>Twitter Posts</h3>
          <span>{platformCounts.Twitter}</span>
        </div>
        <div className="stat-card">
          <h3>LinkedIn Posts</h3>
          <span>{platformCounts.LinkedIn}</span>
        </div>
      </div>

        {posts.length === 0 ? (
          <div className="card empty-card">
            No posts yet. Add one!
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="card post-card">
                <h3>{post.title}</h3>

                <p>{post.content}</p>

                <p>
                  <strong>Platform:</strong> {post.platform}
                </p>

                <div className="post-actions">
                  <button onClick={() => dispatch(likePost(post.id))}>
                    ❤️ Likes: {post.likes}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => dispatch(deletePost(post.id))}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}