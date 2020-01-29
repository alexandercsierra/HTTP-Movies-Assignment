import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios';

export default function AddForm() {

    const [movie, setMovie] = useState({
            id: '',
            title:'',
            director: '',
            metascore: '',
            stars: []
        })
    const history = useHistory();

    const handleChange = e => {
        if (e.target.name !== 'stars'){
            setMovie({
                ...movie,
                [e.target.name]: e.target.value,
            })
        } else {        
            setMovie({
                ...movie,
                stars: [...e.target.value.split(",")]
            })
        }
    }




    const onSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, movie)
            .then(res=>history.push('/'))
            .catch(err=>console.log(err))
    }


    return (
        <form onSubmit={onSubmit}>
            <input name='title' placeholder='title' onChange={handleChange} value={movie.title}/>
            <input name='director' placeholder='director' onChange={handleChange} value={movie.director}/>
            <input name='metascore' placeholder='metascore' onChange={handleChange} value={movie.metascore}/>
            <input name='stars' placeholder='stars' onChange={handleChange} value={movie.stars}/>
            <button>Submit</button>
        </form>
    )
}


