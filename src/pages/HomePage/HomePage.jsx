import MultipleItems from '../../components/MultipleItems/MultipleItems'


function HomePage(){
    return(
        <div>
            <h1 className="d-flex justify-content-center text-dark m-3">AsianCountryList</h1>
            <h4 className="d-flex justify-content-center text-primary m-3 text-center">Expand your knowledge about the countries in the largest continent!</h4>
            <MultipleItems/>
        </div>
    )
}

export default HomePage