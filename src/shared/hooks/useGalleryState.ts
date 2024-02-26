import { useCallback, useState } from 'react'

export const useGalleryState = () => {
    const [currentGalleryImage, setCurrentGalleryImage] = useState<number | null>(null);

    const galleryOpen = useCallback((imageIndex: number) => () => {
        setCurrentGalleryImage(imageIndex);
    }, [setCurrentGalleryImage])

    const galleryClose = useCallback(() => {
        setCurrentGalleryImage(null)
    }, [setCurrentGalleryImage])

    return { currentGalleryImage, galleryOpen, galleryClose }
}