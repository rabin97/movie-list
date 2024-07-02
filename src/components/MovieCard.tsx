import React, { useContext } from 'react'
import { Movie } from '../redux/types/movie.type'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { useAppDispatch } from '../redux/hooks/redux.hooks';
import { removeMovie, updateMovie } from '../redux/slices/movie.slice';
import "react-toggle/style.css"
import Switch from "react-switch";
import { context } from '../hooks/state.context';

interface MovieCardProps {
    data: Movie
    handleFormOpen?: (value: string, id: string) => void
    setReviewformshow: (value: string, id?: string) => void
}

const MovieCard: React.FC<MovieCardProps> = ({
    data,
    handleFormOpen,
    setReviewformshow
}) => {

    const { dispatch } = useContext(context);

    const appDispatch = useAppDispatch()

    const handleshowReviewForm = () => {
        dispatch({ type: "SET_RATING", payload: data.rating ? data.rating : 0 })
        dispatch({ type: "SET_DATA_CONTENT", payload: data })
        setReviewformshow("reviewform", data?.id)
    }
    const handleDelete = (id: string) => {
        appDispatch(removeMovie(id));
    }

    const handleUpdate = (state: boolean) => {
        const updateData: any = { id: data.id, watched: state };

        appDispatch(updateMovie(updateData))

    }

    return (
        <div className='moviecard'
            style={{
                borderColor: data?.watched ? "green" : "",
                background: data?.watched ? "rgba(147, 211, 233, 0.04)" : "",
                boxShadow: data?.watched ? " 0 8px 10px 0 rgba(96, 184, 222, 0.37)" : ""
            }}
        >
            <div className='top'>
                <div className='card-header'>
                    {
                        data?.watched &&
                        <div className='watched'>
                            <h4>Watched</h4>
                        </div>
                    }
                    <img src={"https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWV8ZW58MHx8MHx8fDA%3D"} alt={data.title} />
                    <div className='card-title'>
                        <h2>{data?.title}</h2>
                        <h4> {data?.release_Year && `(${data.release_Year})`}  {data?.Genre}</h4>
                    </div>
                </div>
                <div className='group'>
                    <div className='button-group'>
                        <button className='edit' onClick={() => handleFormOpen?.("form", data.id)} ><FaRegEdit /></button>
                        <button className='delete' onClick={() => handleDelete(data?.id)}><MdDeleteForever /></button>
                    </div>
                    <Switch className='switch' onChange={(state) => handleUpdate(state)} checked={data?.watched ? data.watched : false} />
                </div>
            </div>
            <div className='card-body'>
                {data.description}
            </div>
            <div className='card-footer'>
                {
                    Array.from({ length: 5 }).map((_, index) => {
                        if (data.rating && index < data.rating) {
                            return <button className='' key={index} onClick={handleshowReviewForm}><IoStar color="gold" /></button>
                        }
                        return <button className='' key={index} onClick={handleshowReviewForm}>  <MdOutlineStarBorder key={index} /></button>
                    })
                }
            </div>

        </div>
    )
}

export default MovieCard
