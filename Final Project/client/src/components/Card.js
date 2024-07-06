import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Card.css';
import more from './more.png';

const Card = ({ id, title, created, likes }) => {
    const [count, setCount] = useState(likes);

    const updateCount = async () => {
        const newCount = count + 1;
        setCount(newCount);

        try {
            const { error } = await supabase
                .from('Manure Posts')
                .update({ likes: newCount })
                .eq('id', id);

            if (error) {
                console.error('Error updating likes:', error);
                setCount(count); 
            }
        } catch (error) {
            console.error('Error updating likes:', error.message);
            setCount(count); 
        }
    };

    const formattedDate = new Date(created).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="Card">
            <Link to={`/details/${id}`} className="card-link">
                <div className="Card-Header">
                    <Link to={`/edit/${id}`} className="edit-link">
                        <img className="moreButton" alt="edit button" src={more} />
                    </Link>
                </div>
                <div className="Card-Content">
                    <h2 className="title">{title}</h2>
                    <p className="created">
                        <Link to={`/details/${id}`} className="date-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                            {formattedDate}
                        </Link>
                    </p>
                </div>
            </Link>
            <div className="Card-Footer">
                <button className="like" onClick={updateCount}>🚽 {count}</button>
            </div>
        </div>
    );
};

export default Card;
