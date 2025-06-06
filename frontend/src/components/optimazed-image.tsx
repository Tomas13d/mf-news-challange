// components/OptimizedImage.tsx
import NextImage, { ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "fill"> & {
  alt: string;
  src: string;
  priority?: boolean;
};

// imagen optimizada con NEXT
export const OptimizedImage = ({
  src,
  alt,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  return (
    <NextImage
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      placeholder="blur"
      blurDataURL="/placeholder.svg"
      quality={75}
      priority={priority}
      {...props}
    />
  );
};
