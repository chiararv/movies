import React from 'react'
import { useParams, Link, Switch, Route } from 'react-router-dom'
import PersonInfo from './PersonInfo/PersonInfo'
import Similar from '../../Components/MediaDescription/Similar/Similar'
import Loader from 'react-loader-spinner'
import { useSearch } from '../../Utils/hooks/useSearch'
import classes from './Person.module.css'

const Person = () => {
    const { id } = useParams()

    const [data, isLoading, isError] = useSearch('person', id, 1);

    return (
        <>
            {isError && (
                <div className="alert-danger" role="alert">
                    Error 404: Not Found.
                    API error: There was an error please refresh the page and try again.
                </div>
            )}

            {isLoading && (
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            )}

            {data && !isError && !isLoading && (
                <>

                    <div className={classes.linkContainer}>
                        <Link to={`/person/${id}/info`} className={classes.link}>INFORMACION</Link>
                        <Link to={`/person/${id}/credits`} className={classes.link}>CREDITOS</Link>
                    </div>

                    <Switch>
                        <Route exact path={`/person/${id}/info`}> <PersonInfo media='person' id={id} data={data} /></Route>
                        <Route exact path={`/person/${id}/credits`}><Similar search='combined_credits' data={data} media='person' id={id} /></Route>
                    </Switch>

                </>

            )}

        </>
    )
}

export default Person
