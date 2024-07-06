import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './DetailView.css'; 

const DetailView = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const { data, error } = await supabase
                .from('Characters')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching details:', error);
            } else {
                setDetail(data);
            }
        };

        fetchDetail();
    }, [id]);

    if (!detail) return <div className="DetailView Loading">Loading...</div>;

    return (
        <div className="DetailView">
            <h1>{detail.name}</h1>
            <h2>{detail.class}</h2>
            <p>{detail.description}</p>
        </div>
    );
}

export default DetailView;
