import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import './ReadPosts.css'; 

const ReadPosts = () => {
    const [characters, setCharacters] = useState([]);
    const [sortBy, setSortBy] = useState('created_at'); 
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            let { data: characters, error } = await supabase
                .from('Manure Posts')
                .select('*')
                .order(sortBy, { ascending: false });

            if (error) {
                console.error('Error fetching characters:', error);
            } else {
                setCharacters(characters);
            }
        };

        fetchCharacters();
    }, [sortBy]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value.toLowerCase()); 
    };

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTitle) 
    );

    return (
        <div className="ReadPosts">
            <div className="searchBar">
                <label htmlFor="sortBy">Sort By:</label>
                <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                    <option value="created_at">Latest Created</option>
                    <option value="likes">Most Upvotes</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="cardsContainer">
                {
                    filteredCharacters.length > 0 ?
                        filteredCharacters.map(character => (
                            <Card
                                key={character.id}
                                id={character.id}
                                title={character.name}
                                created={character.created_at}
                                likes={character.likes}
                            />
                        )) : <h2>No Posts Found 😞</h2>
                }
            </div>
        </div>
    );
}

export default ReadPosts;
