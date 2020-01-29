import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function EditForm(props) {
    const {theMovie} = props;
    // const [movie, setMovie] = useState({
    //     id: '',
    //     title:'',
    //     director: '',
    //     metascore: '',
    //     stars: []
    // })
    const [movie, setMovie] = useState(theMovie)
    const [stars, setStars] = useState(theMovie.stars)
    console.log(movie.stars, "movie stars")

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

        axios.put(`http://localhost:5000/api/movies/${theMovie.id}`, movie)
            .then(res=>console.log(res))
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


