import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleOnChangeSelectedId(id: number) {
    
      api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then(response => {
        setMovies(response.data);
      });

      api.get<GenreResponseProps>(`genres/${id}`).then(response => {
        setSelectedGenre(response.data); 
      })
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <SideBar genres = { genres } onChangeSelectedGenreId = { handleOnChangeSelectedId }/>
    <Content movies = { movies } selectedGenre = { selectedGenre } />
    </div>
  )
}