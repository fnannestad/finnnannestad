import NextImage, { ImageProps } from "next/image"

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => {
	let imageSrc = src
	if (typeof src === "string") {
		imageSrc = `${basePath ?? ""}${src}`
	}

	return <NextImage src={imageSrc} {...rest} />
}

export default Image
