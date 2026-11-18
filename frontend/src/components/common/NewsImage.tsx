interface NewsImageProps {
    src: string | null;
    className: string;
    alt?: string;
}

const NewsImage = ({ src, className, alt = "" }: NewsImageProps) => {
    if (!src) {
        return null;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={event => {
                event.currentTarget.style.display = "none";
            }}
        />
    );
};

export default NewsImage;
