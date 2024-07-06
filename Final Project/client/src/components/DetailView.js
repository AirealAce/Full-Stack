import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './DetailView.css'; 

const DetailView = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [likeCount, setLikeCount] = useState(0); 
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState(''); 

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('Comments')
            .select('*')
            .eq('postid', id);

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data);
        }
    };

    useEffect(() => {
        const fetchDetail = async () => {
            const { data, error } = await supabase
                .from('Manure Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching details:', error);
            } else {
                setDetail(data);
                setLikeCount(data.likes); 
            }
        };

        fetchComments();
        fetchDetail();
    }, [id]);

    const handleLikeClick = async () => {
        const newLikeCount = likeCount + 1; 
        setLikeCount(newLikeCount); 

        await supabase
            .from('Manure Posts')
            .update({ likes: newLikeCount })
            .eq('id', id);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        await supabase
            .from('Comments')
            .insert([{ postid: id, content: newComment }]);

        setNewComment('');
        
        fetchComments();
    };

    const handleEditClick = () => {
        window.location.href = `/edit/${id}`;
    };

    const handleDeleteClick = async () => {
        await supabase
            .from('Manure Posts')
            .delete()
            .eq('id', id);
        
        window.location.href = '/';
    };

    if (!detail) return <div className="DetailView Loading">Loading...</div>;

    return (
        <div className="DetailView">
            <button className="editButton" onClick={handleEditClick}>Edit</button>
            <button className="editButton" onClick={handleDeleteClick} style={{ backgroundColor: 'darkred' }}>Delete</button>
            <h1>{detail.name}</h1>
            <h2>{detail.type}</h2>
            <p>{detail.description}</p>
            <button className="likeButton" onClick={handleLikeClick}>
                🚽 {likeCount}
            </button>
            <div>
                <h3>Comments</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>{comment.content}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmitComment}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        style={{
                            width: '300px', 
                            height: '30px', 
                        }}
                    />
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    );
}

export default DetailView;
