import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import CharacterCard from "./CharacterCard";

const WrapperDiv = styled.div`
  width: 400px;
  margin-bottom: 50px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: purple;
  text-align: center;
`;

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState([]);
  const [query,setQuery] = useState('')
  useEffect(() => {
    // TODO: Add AJAX/API Request here - must run in `useEffect`
    axios
      .get(`https://rickandmortyapi.com/api/character/`)
      .then(response => {
        // console.log("DATA:", response.data.results);
        const person = response.data.results.filter(person => 
          person.name.toLowerCase().includes(query.toLocaleLowerCase()));
        setCharacters(person);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
  }, [query]);

    const handleInputChange = event =>{
      setQuery(event.target.value);
    }

  return (
    <section className="character-list grid-view">
      <form>
        <input
        type='text'
        onChange={handleInputChange}
        value={query}
        name='name'
        placeholder='Search me harder'
        />
        <button type='submit' />
      </form>
      <WrapperDiv>
        {characters.map(character =>{
          return(
            <div key={characters.id}>
            <img src={character.image} />
            <h1>Name:{character.name}</h1>
            <h2>Status:{character.status}</h2>
            <h3>Species:{character.species}</h3>
            </div>
          )
        })}
        </WrapperDiv>
    </section>
  );
}