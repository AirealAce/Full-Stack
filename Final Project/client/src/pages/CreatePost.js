import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

function CreatePost() {
    const [post, setPost] = useState({name: "", type: "", description: ""});

    const types = [
        "SAS",
        "B2B",
        "B2G",
        "D2C",
        "C2C",
        "Nonprofit",
        "Freelancer",
        "Startup",
        "Enterprise",
        "Local Business",
        'Freelancer', 
        'Venture Backed', 
        "Product",
    ]; 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const { error } = await supabase
            .from('Manure Posts') 
            .insert([{
                name: post.name, 
                type: post.type, 
                description: post.description
            }]);
        if (error) {
            console.error('Error inserting data:', error);
        } else {
            window.location = "/";
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br /><br />

                <label htmlFor="type">Type</label><br />
                <select name="type" value={post.type} onChange={handleChange}>
                    {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select><br /><br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}></textarea><br />
                
                <input type="submit" value="Submit" />                
            </form>
        </div>
    );
}

export default CreatePost;
