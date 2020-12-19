import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starShips, setStarships] = useState([]);

  const [person, setPerson] = useState([]);

  const request = async () => {
    const response = await Axios.get("https://swapi.dev/api/people/");
    setPeople(JSON.stringify(response.data.count));
  };

  const worlds = async () => {
    const response = await Axios.get("https://swapi.dev/api/planets/");
    setPlanets(JSON.stringify(response.data.count));
  };

  const ufo = async () => {
    const response = await Axios.get("https://swapi.dev/api/starships/");
    setStarships(JSON.stringify(response.data.count));
    console.log(starShips);
  };

  //search individual
  const searchChar = async (name) => {
    try {
      if (name.length !== 0) {
        const response = await Axios.get(
          `https://swapi.dev/api/people/?search=${name}`
        );

        if (response.data) {
          console.log(response.data.results[0].name);
          console.log(response.data.results[0].birth_year);
          console.log(response.data.results[0].homeworld);

          const response2 = await Axios.get(
            `${response.data.results[0].homeworld}`);

          if (response2.data) {
            console.log(response2.data.name)

            //setPerson([`NAME: ${response.data.results[0].name}, \n Birthdate: ${response.data.results[0].birth_year}`]);
            setPerson(
              [<div className='header2'><strong>NAME: </strong> <li>{response.data.results[0].name}</li></div>,
              <div className='header2'><strong>BIRTHYEAR: </strong>, <li>{response.data.results[0].birth_year}</li></div>,
              <div className='header2'><strong>HOMEWORLD: </strong>, <li>{response2.data.name}</li></div>]);
          }
        }
      }
    }
    catch (e) {
      console.log("Server errors")
    }
  }
  function playMusic() {
    var music = new Audio('jedi-sense-message-tone.mp3');
    music.play();
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title" onClick={() => playMusic()}>Star Wars Search Book</h1>
        <h5 className='header2'>"Try and hover to enjoy the effects"</h5>
      </header>
      <div className='vertical'>
        <button className='buttonClass peopleButton' onClick={request}>people</button>
        <h5 className='perbutton'>The total number of charactes in Star Wars are : {people}</h5>
        <button className='buttonClass' onClick={worlds}>planets</button>
        <h5 className='perbutton'>The total number of worlds in Star Wars are : {planets}</h5>
        <button className='buttonClass' onClick={ufo}>starships</button>
        <h5 className='perbutton'>The total number of Star Ships in Star Wars are : {starShips}</h5>
      </div>

      <div className='Main'>
        <h2 className='header2'>Time to Search for them:</h2>
        <input
          className="searchBox"
          autoFocus
          type="text"
          placeholder="Enter the Search term"
          onChange={(e) => searchChar(e.target.value)}
          onSubmit={() => searchChar(search)}
        />

        <p>{person}</p>
      </div>
      <footer className='header2 re'>Created by: ADITYA SHAW</footer>
    </div>
  );
};

export default App;