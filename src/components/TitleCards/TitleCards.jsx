import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import {Link} from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  


  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTg1OTBmNDY4MzI4NGM3OGRlNTM2Y2Y3ZDhkMjJiNCIsIm5iZiI6MTczNzQ2MTkzMC4yMTksInN1YiI6IjY3OGY5MGFhZGM5NjAzZjk0ZDViNDQ4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QkHvboXzV7Yj8ojkDIdME8hWzS5LFEz1ReAkgezNJ6o'
    }
  };
 

  const handleWheel = (event) => {
    event.preventDefault();  // Corrected the typo
    cardsRef.current.scrollLeft += event.deltaY;  // Corrected the typo
  };

  useEffect(() => {

   
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{ title? title :"Popular on Netflix" }</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={ `/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

