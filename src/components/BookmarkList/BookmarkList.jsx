import { gql, useQuery } from "@apollo/client";
import ItemCard from "../ItemCard/ItemCard";
import './BookmarkList.css'

function BookmarkList(props){
    const removeBtnHandler = props.removeBtnHandler
    const addBtnHandler = props.addBtnHandler
    const cont = "AS"
    const code = props.code
    const COUNTRIES_QUERY = gql`
        query GetCountriesByContinent($cont: String, $code: [String]){
            countries(filter:{continent:{ eq:$cont} code:{in:$code}}) {
            name
            continent{
                name
            }
            code
            native
            phone
            capital
            currency
            }
        }
    `

    const {loading, error, data} = useQuery(COUNTRIES_QUERY,{
            variables: {
                cont: cont,
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
    console.log(data)
    const countries = data.countries
    return(
        <div className="item-container">
            {countries?.map(c => {
                return(
                    <ItemCard country={c} key={c.code} removeBtnHandler={removeBtnHandler} addBtnHandler={addBtnHandler}/>
                )
            })}
        </div>
    )

}

export default BookmarkList