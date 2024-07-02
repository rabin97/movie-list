import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Movie } from '../types/movie.type';

const initialState: Movie[] = [];

interface updateMoviePayload {
    id: string;
    title?: string;
    description?: string;
    release_Year?: string | number;
    Genre?: string;
    watched?: boolean;
}

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: initialState

    },
    reducers: {
        addMovie: (state, action: PayloadAction<Omit<Movie, 'id'>>) => {
            const newMovie = { id: uuidv4(), watched: false, ...action.payload };
            state.movies.unshift(newMovie);
        },
        removeMovie: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
        },
        updateMovie: (state, action: PayloadAction<updateMoviePayload>) => {
            const index = state.movies.findIndex(movie => movie.id === action.payload.id);
            if (index !== -1) {
                state.movies[index] = {
                    ...state.movies[index],
                    ...action.payload
                }
            }
        },
        addReview: (state, action: PayloadAction<{ id: string, rating: number, review_content: string }>) => {
            const { id, rating, review_content } = action.payload;
            const index = state.movies.findIndex(movie => movie.id === id);
            if (index !== -1) {
                state.movies[index].rating = rating;
                state.movies[index].review_content = review_content;
            }
        },
    }
});

export const { addMovie, removeMovie, updateMovie, addReview } = movieSlice.actions;
export default movieSlice.reducer;
