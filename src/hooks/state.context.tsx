import React, { createContext, Dispatch, useReducer } from 'react'
import { Movie } from '../redux/types/movie.type'


export interface stateType {
    rating: number,
    data: Movie
}
type Action =
    | { type: 'SET_RATING'; payload: number }
    | { type: 'SET_DATA_CONTENT'; payload: Movie };

const initialState: stateType = {
    rating: 0,
    data: {
        id: '',
        title: '',
        description: '',
        release_Year: '',
        Genre: ''
    }

}

export const context = createContext<{ state: stateType; dispatch: Dispatch<Action> }>({
    state: initialState,
    dispatch: () => { }
})
const formReducer = (state: stateType, action: Action): stateType => {
    switch (action.type) {
        case 'SET_RATING':
            return { ...state, rating: action.payload };
        case 'SET_DATA_CONTENT':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};



const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    return (
        <context.Provider value={{ state, dispatch }}>
            {children}
        </context.Provider>
    )
}

export default StateContextProvider
