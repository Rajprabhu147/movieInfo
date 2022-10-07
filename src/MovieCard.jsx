import React from 'react';

const MovieCard = (props) => {
    const { Title, Year, imdbID, Type, Poster } = props.movie;

    return (
        <div className='movie' key={imdbID}>
            <div>
                <p>{Year}</p>
            </div>
            <div onClick={() => {
                    props.onMovieSelect(imdbID);
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }}>
                <img src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400'} alt={Title}/>
            </div>

            <div>
                <span>{Type}</span>
                <h3>{Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;