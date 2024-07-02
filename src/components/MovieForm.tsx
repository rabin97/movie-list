import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { RxCrossCircled } from "react-icons/rx";
import { useAppDispatch } from '../redux/hooks/redux.hooks';
import { addMovie, updateMovie } from '../redux/slices/movie.slice';
import { context } from '../hooks/state.context';

interface Movie {
    title: string;
    description: string;
    release_Year: string | number;
    Genre: string;
}

interface MovieFormProps {
    show: boolean;
    setformshow: (value: boolean) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ show, setformshow }) => {
    // console.log("🚀 ~ data:", data)

    const { state } = useContext(context);

    const data = state.data;

    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Movie>({
        values: {
            title: data?.title ?? "",
            description: data?.description ?? "",
            release_Year: data?.release_Year ?? "",
            Genre: data?.Genre ?? ""
        }
    });

    const onSubmit = (formData: Movie) => {
        dispatch(addMovie(formData));
        setformshow(false);
        reset();
    };

    const onEdit = (formData: Movie) => {
        if (!data?.id) return;

        const updateData: any = { id: data.id };

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== "" && value !== undefined) {
                updateData[key as keyof Movie] = value as any;
            }
        });

        dispatch(updateMovie(updateData));
        setformshow(false);
        reset();
    }

    const handleClose = () => {
        setformshow(false);
        reset();
    };

    return (
        <>
            {show &&
                <div className='overlay'>
                    <div className='form-wrapper'>
                        <h2 className='form-title'>Add Movie Details</h2>
                        <button className='cross' onClick={handleClose}><RxCrossCircled /></button>
                        <form onSubmit={handleSubmit(data ? onEdit : onSubmit)} className="movie-form">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input id="title" {...register('title', { required: data == null ? false : 'Title is required' })} />
                                {errors.title && <p className="error">{errors.title.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" {...register('description')} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="release_Year">Release Year</label>
                                <input type="text" id="release_Year" {...register('release_Year')} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Genre">Genre</label>
                                <input id="Genre" {...register('Genre')} />
                            </div>

                            <button className='form-submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default MovieForm;
