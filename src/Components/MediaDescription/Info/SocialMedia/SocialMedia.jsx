import React from 'react'
import classes from './SocialMedia.module.css'
import {
    FaInstagram,
    FaTwitter,
    FaLink,
    FaImdb,
    FaFacebookSquare,
} from 'react-icons/fa';
import { useSearch } from '../../../../Utils/hooks/useSearch';


const SocialMedia = ({ media, id, homepage }) => {

    const [data, isLoading, isError] = useSearch(media, id, 1, "external_ids");
    // console.log('data ids', data)

    const socialMediaObj = {
        imdb_id: (codigoLink) =>
            (<a href={`https://www.imdb.com/title/${codigoLink}`}> < FaImdb className={classes.icon} /></a>),
        facebook_id: (codigoLink) =>
            (<a href={`https://www.facebook.com/${codigoLink}`}> <FaFacebookSquare className={classes.icon} /></a>),
        instagram_id: (codigoLink) =>
            (<a href={`https://www.instagram.com/${codigoLink}`}> < FaInstagram className={classes.icon} /></a>),
        twitter_id: (codigoLink) =>
            (<a href={`https://twitter.com/${codigoLink}`}> <FaTwitter className={classes.icon} /></a>),
        homepage: (codigoLink) =>
            (<a href={`${codigoLink}`}> <FaLink className={classes.icon} /></a>)
    }
    const socialMediaArr = Object.keys(socialMediaObj)

    if (data) {
        return (
            <div>
                {socialMediaArr.map(element => {

                    if (element !== "homepage") {
                        return (data[element]) && (socialMediaObj[element](data[element]))
                    }
                    return (socialMediaObj[element](homepage))
                })
                }
            </div>
        )
    }

    return null

}

export default SocialMedia
