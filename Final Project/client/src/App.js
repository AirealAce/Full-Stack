import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import DetailView from './components/DetailView'; 
import { Link } from 'react-router-dom';

const App = () => {
  
  const descr = ''

  const posts = [
  ]
 
  let element = useRoutes([
    { path: "/", element: <ReadPosts data={posts}/> },
    { path: "/edit/:id", element: <EditPost data={posts} /> },
    { path: "/new", element: <CreatePost /> },
    { path: "/details/:id", element: <DetailView /> }, 
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>💰 Preneur Manure 💩</h1>
        <Link to="/"><button className="headerBtn"> Explore Posts 👀 </button></Link>
        <Link to="/new"><button className="headerBtn"> Add Idea 🧻 </button></Link>
      </div>
      {element}
    </div>
  );
}

export default App;
