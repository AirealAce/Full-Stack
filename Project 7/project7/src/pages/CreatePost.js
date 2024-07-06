import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

function CreatePost() {
    const [post, setPost] = useState({name: "", class: "", description: ""});

    const classes = [
        "Martial Artist",
        "Beast",
        "Destroyer", 
        "Holy Knight", 
        "Predator", 
        "Shinobi", 
        "Archangel", 
        "Druid", 
        "Warlock", 
        "Shinigami",
        "Mechamaster",
        "Artillerist",
        "Phantom",
        "Chronoshifter",
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
            .from('Characters')
            .insert([{
                name: post.name, 
                class: post.class, 
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

                <label htmlFor="class">Class</label><br />
                <select name="class" value={post.class} onChange={handleChange}>
                    {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
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
