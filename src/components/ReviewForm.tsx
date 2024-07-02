import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCrossCircled } from 'react-icons/rx'
import StarRating from './StarRating'
import { useAppDispatch } from '../redux/hooks/redux.hooks'
import { addReview } from '../redux/slices/movie.slice'
import { context } from '../hooks/state.context'


interface Review {
    rating?: number
    review_content?: string
}

interface ReviewFormProps {
    show: boolean
    handleFormOpen: (value: string, id?: string) => void
    setReviewformshow: Dispatch<SetStateAction<boolean>>
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    show,
    setReviewformshow
}) => {
    const dispatch = useAppDispatch();

    const { state } = useContext(context);
    const data = state.data;

    const [rating, setRating] = React.useState(0)
    const [error, setError] = useState(false)


    const { register, handleSubmit, formState: { }, reset } = useForm<Review>({
        values: {
            review_content: state.data?.review_content ? state.data?.review_content : ""
        }
    })

    useEffect(() => {
        if (!rating) {
            setError(true)
            return
        } else {
            setError(false)
        }
    }, [rating])



    const onSubmit = (formdata: Review) => {

        if (!rating) {
            setError(true)
            return
        } else {
            setError(false)
        }


        dispatch(addReview({ id: data?.id ? data?.id : "", rating, review_content: formdata.review_content ? formdata.review_content : "" }))
        setRating(0)
        setError(false)
        close();
        reset();
    }


    const close = () => {
        reset();
        setError(false)
        setReviewformshow(false)
    }
    return (
        <>
            {
                show && data &&
                <div className='overlay'>
                    <div className='form-wrapper'>
                        <h2 className='form-title'>Write a review for {data?.title.split(" ")[0]}</h2>
                        <button className='cross' onClick={close} ><RxCrossCircled /></button>
                        <form onSubmit={handleSubmit(onSubmit)} className="movie-form">
                            <div className="star-group">
                                <StarRating rating={rating} setRating={setRating} />
                                {
                                    error && <h4 className='error'>Please rate the movie</h4>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Write Somthing</label>
                                <textarea id="description" {...register('review_content')} />
                            </div>
                            <button className='form-submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ReviewForm
