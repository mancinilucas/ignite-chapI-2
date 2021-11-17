import { useEffect, useState } from "react";
import { GenreResponseProps } from "../App";
import { Button } from "./Button";

interface SideBarProps{
  genres: GenreResponseProps[];
  onChangeSelectedGenreId: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    props.onChangeSelectedGenreId(selectedGenreId);
  }, [selectedGenreId]);

  function handleClickButton(id: number){
    setSelectedGenreId(id);
  }

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {props.genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}