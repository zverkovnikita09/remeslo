
interface GeoIconProps {
    iconWidth?: number
    iconHeight?: number
    strokeColor?: string
    
}

export const GeoIcon = ({ iconHeight = 20, iconWidth = 20, strokeColor = '#122533' }:GeoIconProps) => {
    return (

        <svg width={ iconWidth } height={ iconHeight } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.9999 11.1916C11.4358 11.1916 12.5999 10.0276 12.5999 8.59164C12.5999 7.1557 11.4358 5.99164 9.9999 5.99164C8.56396 5.99164 7.3999 7.1557 7.3999 8.59164C7.3999 10.0276 8.56396 11.1916 9.9999 11.1916Z" stroke={ strokeColor } stroke-width="1.5" />
            <path d="M3.01626 7.07502C4.65793 -0.141644 15.3496 -0.133311 16.9829 7.08336C17.9413 11.3167 15.3079 14.9 12.9996 17.1167C11.3246 18.7334 8.67459 18.7334 6.99126 17.1167C4.69126 14.9 2.05793 11.3084 3.01626 7.07502Z" stroke={ strokeColor } stroke-width="1.5" />
        </svg>

    )
}
