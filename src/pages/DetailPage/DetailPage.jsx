import { gql, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import './DetailPage.css'

function DetailPage(){
    let {code} = useParams()

    var str_bookmarks = localStorage['bookmarks'] || '';
    var bookmarks = []
    if(str_bookmarks !== ''){
        bookmarks = str_bookmarks.split(',')
    }

    var temp = false
    if(bookmarks.includes(code))
        temp = true
    
    const [isFavorite, setFavorite] = useState(temp)

    const SEARCH_QUERY = gql`
    query GetCountriesByCode($code: ID!){
        country(code:$code) {
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
            code: code
        }
    })

    if(loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only">Fetching data.. please wait</span>
                </div>
                <span className="ml-2 text-md-center font-italic">Fetching data.. please wait</span>
            </div>
        )

    const handleButton = () => {
        if(!isFavorite){
            setFavorite(true)
            if(str_bookmarks !== ''){
                str_bookmarks += `,${code}`
            }
            else{
                str_bookmarks = code
            }
            bookmarks.push(code)
            localStorage.setItem("bookmarks", str_bookmarks);
        }
        else{
            setFavorite(false)
            bookmarks = bookmarks.filter(c => c !== code)
            localStorage.setItem("bookmarks", bookmarks.toString());
        }
            
    }   
    var btn = ""
    if(!isFavorite)
        btn = <button className="btn btn-outline-success" onClick={handleButton}>Bookmark This</button>
    else
        btn = <button className="btn btn-outline-danger" onClick={handleButton}>Unbookmark This</button>

    const country = data.country;
    console.log(country)
    return(
        <div className="detail-container container">
        <div className="card text-dark bg-light">
            <div className="card-header detail-title">
                <div className="detail-flag">
                    <img className="img-thumbnail img-flag" src={`https://countryflagsapi.com/png/${country.code.toLowerCase()}`} alt="" />
                </div>
                <h2 className="display-4">{country.name}</h2>
                {btn}
            </div>
            <div className="card-body">
                <p className="card-text"><p className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/></svg>  Capital city</p><p className="text-xl-center font-weight-bold">{country.capital}</p></p>
                <p className="card-text"><p className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
  <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
</svg>  Currencies used</p><p className="text-xl-center font-weight-bold">{country.currency}</p></p>
                <p className="card-text"><p className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass-fill" viewBox="0 0 16 16">
  <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.503 7.503 0 0 1 5.538 7.24zm-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z"/>
</svg>  Native Name</p><p className="text-xl-center font-weight-bold">{country.native}</p></p>
                <p className="card-text"><p className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg>  Phone Number Code</p><p className="text-xl-center font-weight-bold">+{country.phone}</p></p>
                <p className="card-text"><p className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
</svg>  Languages</p></p>
                {
                country.languages.length === 0 ? <p className="card-text">   <p className="text-xl-center font-italic">No languages data found</p></p> : country.languages.map(lang => <p className="card-text"><p className="font-weight-bold text-lg-center">   - {lang.name}</p></p>)
                }
                <p className="card-text"><p className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.502.502 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5V.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.498.498 0 0 0-.196 0L5 14.09zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1-.5-.1z"/>
</svg>  States / Counties</p></p>
                {
                    country.states.length === 0 ? <p className="card-text">  <p className="text-xl-center font-italic">No states data found</p></p> : country.states.map(state => <p className="card-text"><p className="font-weight-bold text-lg-center">    - {state.name}</p></p>)
                }
            </div>
        </div>
    </div>
    )
}

export default DetailPage