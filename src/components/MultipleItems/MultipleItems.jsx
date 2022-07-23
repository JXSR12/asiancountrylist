import { gql, useQuery } from "@apollo/client";
import ItemCard from "../ItemCard/ItemCard";
import './MultipleItems.css'

function MultipleItems(props){
    const checkBkmHandler = props.checkBkmHandler
    const removeBtnHandler = props.removeBtnHandler
    const addBtnHandler = props.addBtnHandler
    const cont = "AS"
    const COUNTRIES_QUERY = gql`
        query GetCountriesByContinent($cont: String){
            countries(filter:{continent:{ eq:$cont}}) {
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
                cont: cont
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
                    <ItemCard country={c} key={c.code} removeBtnHandler={removeBtnHandler} addBtnHandler={addBtnHandler} checkBkmHandler={checkBkmHandler}/>
                )
            })}
        </div>
    )

}

export default MultipleItems