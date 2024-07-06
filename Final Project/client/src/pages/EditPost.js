import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams(); 
    const [character, setCharacter] = useState({ name: '', type: '', description: '' });

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
        "Product"
    ];

    useEffect(() => {
        const fetchCharacter = async () => {
            const { data, error } = await supabase
                .from('Manure Posts') 
                .select()
                .eq('id', id)
                .single();
            if (error) {
                console.error('Error fetching character:', error);
            } else {
                setCharacter(data);
            }
        };

        fetchCharacter();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCharacter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateCharacter = async (event) => {
        event.preventDefault();
        
        const { data, error } = await supabase
            .from('Manure Posts')
            .update({ name: character.name, type: character.type, description: character.description })
            .eq('id', id);
        
        if (error) {
            console.log('Error updating character:', error);
        } else {
            console.log('Character updated:', data);
            window.location = "/"; 
        }
    };

    const deleteCharacter = async () => {
        const { error } = await supabase
            .from('Manure Posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.log('Error deleting character:', error);
        } else {
            window.location = "/";
        }
    };

    return (
        <div>
            <form onSubmit={updateCharacter}>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={character.name} onChange={handleChange} /><br /><br />

                <label htmlFor="type">Type</label><br />
                <select id="type" name="type" value={character.type} onChange={handleChange}>
                    {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select><br /><br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={character.description} onChange={handleChange}></textarea><br />
                
                <input type="submit" value="Submit" />
                <button type="button" className="deleteButton" onClick={deleteCharacter}>Delete</button>
            </form>
        </div>
    );
}

export default EditPost;
