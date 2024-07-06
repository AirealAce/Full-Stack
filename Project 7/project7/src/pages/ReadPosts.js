import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            let { data: characters, error } = await supabase
                .from('Characters')
                .select('*');  

            if (error) {
                console.error('Error fetching characters:', error);
            } else {
                setCharacters(characters);
            }
        };

        fetchCharacters();
    }, []);

    return (
        <div className="ReadPosts">
            {
                characters.length > 0 ?
                characters.map((character, index) => (
                    <Card 
                        key={character.id}
                        id={character.id}
                        title={character.name} 
                        author={character.class}  
                    />
                )) : <h2>No Characters Found 😞</h2>
            }
        </div>  
    );
}

export default ReadPosts;
