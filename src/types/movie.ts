export interface Movies{
    Title:string,
    Year:string,
    imdbID:string,
    Type:"series" | "movie",
    Poster:string,
}
export interface SingleMovieShow{
Actors: string,
Awards: string,
Director: string,
Genre: string,
Language: string,
Plot: string,
Poster: string,
Runtime: string,
Title: string,
Year: string,
imdbID: string,
imdbRating: string,
imdbVotes: string,
Error?:string
}

export interface MovieActions{
    getSingleMovieorShow:(id:string)=> void,
}