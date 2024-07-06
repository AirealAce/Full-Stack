import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import more from './more.png';

const Card = (props) => {
    const [count, setCount] = useState(0);

    const updateCount = () => {
        setCount(count => count + 1);
    }

    return (
        <div className="Card">
            <Link to={'edit/' + props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
            <h2 className="title">{props.title}</h2>
            <h3 className="author">{props.author}</h3>
            <p className="description">{props.description}</p>
            <Link to={`/details/${props.id}`}>
                <button className="betButton" onClick={updateCount}>👍 Level: {count}</button>
            </Link>
        </div>
    );
};

export default Card;
