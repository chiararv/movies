import React from 'react'
import { Switch, Route, BrowserRouter as Router, useParams, Link } from 'react-router-dom'
import classes from './MediaDescription.module.css'
import { useSearch } from '../../Utils/hooks/useSearch'
import Info from './Info/Info'
import Cast from './Cast/Cast'
import Similar from './Similar/Similar'
import Videos from './Videos/Videos'
import Seasons from './Seasons/Seasons'


const MediaDescription = () => {

    const { media, id } = useParams()

    const [data, isLoading, isError] = useSearch(media, id);


    return (
        <div>
            {data && (
                <div className={classes.container}>
                    <div className={classes.imgContainer}>
                        <div className={classes.imgShadow}></div>
                        <div style={{ background: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} className={classes.img}></div>
                    </div>

                    <div className={classes.linkContainer}>
                        <Link to={`/${media}/${id}/info`} className={classes.link}>INFO</Link>
                        <Link to={`/${media}/${id}/cast`} className={classes.link}>REPARTO</Link>
                        {(media === 'movie')
                            ? <Link to={`/${media}/${id}/videos`} className={classes.link}>VIDEOS</Link>
                            : <Link to={`/${media}/${id}/seasons`} className={classes.link}>TEMPORADAS</Link>
                        }
                        <Link to={`/${media}/${id}/similar`} className={classes.link}>SIMILARES</Link>
                    </div>

                    <Switch>
                        <Route exact path={`/${media}/${id}/info`}><Info data={data} media={media} /></Route>
                        <Route exact path={`/${media}/${id}/cast`}><Cast data={data} media={media} id={id} /></Route>
                        {(media === 'movie')
                            ? <Route exact path={`/${media}/${id}/videos`}><Videos data={data} media={media} id={id} /></Route>
                            : <Route exact path={`/${media}/${id}/seasons`}><Seasons seasonsNum={data.number_of_seasons} media={media} id={id} /></Route>
                        }
                        <Route exact path={`/${media}/${id}/similar`}><Similar data={data} media={media} id={id} /></Route>

                    </Switch>
                </div>
            )}

        </div>
    )
}

export default MediaDescription
