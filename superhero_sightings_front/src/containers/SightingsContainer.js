import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SightingForm from '../components/sightings/SightingForm';
import SightingList from '../components/sightings/SightingList';



const SightingsContainer = () => {

    const[sightings, setSightings] = useState (
        [
            {
                id: 1,
                superhero: "Batman", 
                city: "Rome", 
                date: "27-02-2020"
            },
            {
                id: 2, 
                superhero: "Superman",
                city: "Melbourne",
                date: "22-04-2021"
            }
        ]
    )

    const addSighting = (submittedSighting) => {
        submittedSighting.id = Date.now();
        const updatedSightings = [...sightings, submittedSighting];
        setSightings(updatedSightings);
      }

    const getAllData = () =>{
        console.log("getting data...");
        const request = new Request();
        const sightingPromise = request.get('/api/sightings')

        Promise.all([sightingPromise])
        .then((data => {
            setSightings();
        }))


        const handlePost = (sighting) => {
            const request = new Request();
            request.post("/api/sightings", sighting)
            .then(() => window.location = '/sightings')
        }

        if (!{sightings}) {
            return null
        }

    }
    

    return (
        <>

        <Switch>
            <Route exact path = '/sightings/new' render={
                () => {return <SightingForm onSightingSubmit={(sighting) => addSighting(sighting)} onCreate={handlePost}/> }
            }/>
        </Switch>

        <h1>Superhero Sightings</h1>
        <h2>Recent Sightings</h2>
        <SightingList sightings ={sightings} />	
        <h2>Report a Sighting</h2>
        	
        </>

    );
}


export default SightingsContainer;

