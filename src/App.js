import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import './App.css';
import MovieInfoComponent from './MovieInfoComponent';


//Api Key
//8fdb4595

export const API_KEY = '8fdb4595';

const App = () => {

    const [movies, updateMovies] = useState([]);
    const [searchTerm, updateSearchTerm] = useState("");
    const [timeoutId, updateTimeoutId] = useState();
    const [selectedMovie, onMovieSelect] = useState();

    useEffect(() => {
        fetchData("2022");
    }, []);



    // const searchMovies = async (title) => {
    //     const response = await fetch(`${API_URI}&s=${title}`);
    //     const data = await response.json();

    //     setMovies(data.Search);
    // };
    
    const fetchData = async (searchString) => {
        
        const response = await Axios.get(
            `https://www.omdbapi.com?s=${searchString}&apikey=${API_KEY}`,
        );
        updateMovies(response.data.Search);
    }

    const onTextChange = (e) => {
        onMovieSelect("")
        clearTimeout(timeoutId);
        updateSearchTerm(e.target.value);
        const timeout = setTimeout(() => fetchData(e.target.value),200);
        updateTimeoutId(timeout);
    };

    return (
        <div className='app'>
            <h1>MovieInfo</h1>

            <div className='search'>
                <input placeholder='Search for Movies' value={searchTerm} onChange={onTextChange} />
                <img src={SearchIcon} alt='search' onClick={() => fetchData(searchTerm)} />
            </div>

            { selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}

            { movies?.length > 0 ?
            
            (                   
                    <div className='container'>
                        {movies.map((movie, index) => (
                            <MovieCard 
                            movie={movie}
                            key={index}
                            onMovieSelect={onMovieSelect}
                            />
                        ))}
                    </div>
            ) : (
                        <div className='empty'>
                            <h2>
                                No Movies Found!
                            </h2>
                        </div>
                )
            }


        </div>
    );
}

export default App;