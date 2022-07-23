import './SearchPage.css'
import React, { useState, useEffect } from 'react'
import {gql, useQuery} from '@apollo/client'
import ItemCard from '../../components/ItemCard/ItemCard'

function SearchPage(){

    const [keyword, setKeyword] = useState("")

    const handleSearch = () => {
        setKeyword(document.getElementById('keyword').value)
        console.log(keyword)
    }

    const SEARCH_QUERY = gql`
    query GetCountriesByCode($code: String){
        countries(filter:{continent: { eq: "AS"} code:{ eq: $code }}) {
            name
            continent{
                name
            }
            native
            phone
            languages{
                name
            }
            emoji
            states{
                name
            }
            code
            capital
            currency
            }
        }
    `

    const {loading, e, data} = useQuery(SEARCH_QUERY, {
        variables: {
            code: keyword.toUpperCase()
        }
    })

    console.log(data)
    var search_result = "";
    if(loading || keyword === "")
        search_result = ""
    else{
        if(!data || !data.countries || data.countries.length === 0)
            search_result = <i className="text-danger font-weight-bold">There is no asian country with 2 letter code '{keyword.toUpperCase()}'.</i>
        else{
            const country = data.countries[0];
            search_result = <ItemCard country={country} key={country.code}/>
        }
    }

    return(
        <div>
            <h1 className="d-flex justify-content-center text-dark m-3">Search an Asian country by 2 letter code</h1>
            <h4 className="d-flex justify-content-center text-primary m-3 text-center">Search for any country in Asia using its 2-Letter-Code (Ex: MY for Malaysia)</h4>
            
            <div className="search-page-container">
                <div className="search-container mt-3">
                    <div className="form-inline">
                        <input id="keyword" className="form-control w-100" type="search" placeholder="Search Country by Code" aria-label="Search" />
                        <button className="btn-lg btn-outline-primary w-100 mt-2" type="submit" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="search-result mt-3">{search_result}</div>
            </div>
        </div>
    )
}

export default SearchPage