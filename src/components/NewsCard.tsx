import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { News } from '../types/News';
import Link from 'next/link';

interface Props {
  news: News;
}

export default function NewsCard({ news }: Props) {
  return (
    <Link href={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardMedia component="img" height="140" image={news.imageUrl} alt={news.title} />
        <CardContent>
          <Typography variant="h6">{news.title}</Typography>
          <Typography variant="body2" color="text.secondary">{news.author}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}