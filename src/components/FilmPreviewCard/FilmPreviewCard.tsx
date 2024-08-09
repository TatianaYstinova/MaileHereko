import { Box, Card, CardContent, CardMedia, CircularProgress, Rating, Typography } from "@mui/material"
import theme from "../../theme"
import { RatingStar } from "../../assets/svg/RatingStar"
import { useEffect, useState } from "react"

/* 
компонент карточки фильма
с названием и картинкой,
без дополнительной информации
*/
export type FilmPreviewCardProps = {
    name: string | undefined,
    alternativeName: string,
    grade: number,
    img: string | undefined
}
export const FilmPreviewCard = (props: FilmPreviewCardProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl] = useState(props.img ? props.img : props.alternativeName);

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setIsLoading(false);
        }

        img.onerror = () => setIsLoading(false);
    }, [imageUrl]);

    return (
        (isLoading ? <CircularProgress /> : <Card sx={{ maxWidth: 284, maxHeight: 480, p: 2, borderRadius: '12px', position: 'relative' }}>
            <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', paddingX: 1, paddingY: 1.5, gap: '4px', backgroundColor: '#000000A6', borderRadius: '8px', mt: 1.3, ml: 1 }} >
                <Typography component="span" sx={{ color: '#FFBD6D' }}>{props.grade.toFixed(1)}</Typography>
                <Rating max={1} name="simple-controlled" value={1} icon={<RatingStar />} />
            </Box>
            <CardMedia
                component="img"
                height="inherit"
                image={imageUrl}
                alt="Image description"
                sx={{ borderRadius: '8px' }}
                style={{ display: isLoading ? 'block' : 'block' }}
            />
            <CardContent sx={{ paddingTop: 2 }} style={{ paddingBottom: 8 }}>
                <Typography sx={{ color: theme.palette.grey[50], fontSize: '16px', lineHeight: '24px', fontWeight: '600', textAlign: 'left' }} component="p">
                    {props.name}
                </Typography>
            </CardContent>
        </Card>)
    )
}