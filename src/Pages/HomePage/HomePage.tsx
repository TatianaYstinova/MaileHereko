import './HomePage.scss';
import { useEffect, useState } from 'react';
import { Filter, IQueryFields, MovieDtoV13, } from '@openmoviedb/kinopoiskdev_client';
import { getMoviesByFilter } from '../../entities/movie/api/get-by-filters';
import { FilmPreviewCard } from '../../components/FilmPreviewCard/FilmPreviewCard';
import { Button, Grid, Typography } from '@mui/material';
import theme from '../../theme';

export type moviesData = {
    totalCount: number,
    pages: number
}
export const HomePage = () => {

    const [moviesData, setMoviesData] = useState<moviesData>({totalCount: 0, pages: 0 })
    const [movies, setMovies] = useState<MovieDtoV13[]>([])
    const [filter, setFilters] = useState<Filter<IQueryFields>>({ page: 1, limit: 8 })

    useEffect(() => {
        getMoviesByFilterHandler(filter)
        console.log(moviesData)
    }, [])

    const getMoviesByFilterHandler = async (filters: Filter<IQueryFields>) => {
        const response = await getMoviesByFilter(filters)
        if (response.data) {
            const newMoviesData = {
                totalCount: response.data.total,
                pages: response.data.pages
            }
            setMoviesData(newMoviesData)
            setMovies( [...movies, ...response.data.docs])
        }
    }

    const loadMore = async () => {
        const filterValue: Filter<IQueryFields> = {
            ...filter,
            limit: filter.limit,
            page: Number(filter.page)! + 1
        }
        setFilters(filterValue)
        await getMoviesByFilterHandler(filter)
    }

    return (
        <div>
            <Typography component='p' align='left' sx={{ color: theme.palette.grey[400], m: 3, fontSize: '16px', lineHeight: '24px', whiteSpace: 'nowrap', fontWeight: '400' }} variant="h4"> {`Все ( ${moviesData?.totalCount} )`}</Typography>
            <Grid
                container
                spacing={3}
                columns={{ xs: 4, md: 12 }}
                sx={{ justifyContent: 'center', width: '100%', position: 'relative', alignItems: 'center' }}
            >
                {movies?.map((movie: MovieDtoV13) => {
                    return (
                        <Grid key={movie.id} item md={3} style={{ minWidth: '284px' }}>
                            <FilmPreviewCard
                                alternativeName={movie.alternativeName ? movie.alternativeName : ''}
                                name={movie.name}
                                grade={23}
                                img={movie.poster?.url} />
                        </Grid>
                    )
                })}
            </Grid>
            <Button
                type="button"
                sx={{ mt: 4 }}
                onClick={loadMore}
                >
                get more
            </Button>
        </div>

    )
}