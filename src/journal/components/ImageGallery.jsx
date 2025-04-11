import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({ images }) => {
  return (
    <ImageList
      sx={{ width: '100%', height: 500 }}
      cols={4}
      rowHeight={300}
    >
      {images &&
        images.map((image) => (
          <ImageListItem key={image}>
            <img
              srcSet={`${image}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
              src={`${image}?w=300&h=300&fit=crop&auto=format`}
              alt='Image'
              loading='lazy'
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
};
