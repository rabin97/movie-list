export interface Movie {
    id: string,
    title: string
    description: string
    release_Year: number | string
    Genre: string
    rating?: number
    review_content?: string
    watched?: boolean
}

export const movies: Movie[] = [
    {
        id: '1',
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        release_Year: 2010,
        Genre: 'Science Fiction'
    },
]