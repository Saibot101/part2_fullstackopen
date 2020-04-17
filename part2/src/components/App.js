import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
    const [ countries, setCountries] = useState([]);

    const [showCountries, setShowCountries] = useState(true);
    const [search, setSearch] = useState('');
    const [searchedCountries, setSearchedCountries] = useState([{name: "search for countries"}])

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
                console.log(response.data)
            })
    }, [])


    const changeHandler = (event) => {
        setSearch(event.target.value)

        if(event.target.value !== ""){
            setShowCountries(false);
            if(countries.filter(countrie => countrie.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1).length > 10){
                setSearchedCountries([{name: "more then 10 countries"}])
                console.log('to many')
            } else {
                setSearchedCountries(countries.filter(countrie => countrie.name.toLowerCase().indexOf(event.target.value.toLowerCase())> -1))
                console.log('under 10')
            }
        } else {
            setShowCountries(true)
            setSearchedCountries([{name: "search for countries"}])
            console.log(true)
        }
    };

    const Countries = () => {
        if(searchedCountries.length === 1){

            if(searchedCountries[0].name === "search for countries" || searchedCountries[0].name === "more then 10 countries"){
                return (
                    <div>
                        <p>{searchedCountries[0].name}</p>
                    </div>

                )
            }else {
                console.log(searchedCountries[0])
                return (
                    <div>
                        <CountrieView/>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <ul>
                        {searchedCountries.map( countrie => [
                            <p key={countrie.id}> {countrie.name}</p>,
                            <button key={countrie.name} type={"submit"} onClick={() => {setSearch(countrie.name); setSearchedCountries([countrie])}}>{countrie.name} show</button> ]
                        )
                        }

                    </ul>
                </div>
            )
        }
    }

    const CountrieView = () => {
        return(
            <div>
                <h1>{searchedCountries[0].name}</h1>
                <p>Capital: {searchedCountries[0].capital}</p>
                <p>Population: {searchedCountries[0].population}</p>
                <h3>Languages</h3>
                <ul>
                    {searchedCountries[0].languages.map(language => <p key={language.name}>{language.name}</p>)}
                </ul>
                <img src={searchedCountries[0].flag}  alt={"empty"} width={150} height={150}/>
            </div>
        )
    }

    return (
        <div>
            <p>filter shown with </p>
            <input value={search} onChange={changeHandler}/>

            <h2>Countries</h2>
            <Countries />

        </div>
    )
};

export default App
