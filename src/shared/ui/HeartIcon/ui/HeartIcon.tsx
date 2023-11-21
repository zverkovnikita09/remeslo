interface HeartIconProps {
    iconWidth?: number
    iconHeight?: number
    strokeColor?: string
    fillColor?: string

}

export const HeartIcon = ({ iconHeight = 29, iconWidth = 28, strokeColor = '#122533', fillColor = '#ffffff' }: HeartIconProps) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 29 28" fill="none">
            <path d="M15.2233 24.2784C14.8266 24.4184 14.1733 24.4184 13.7766 24.2784C10.3933 23.1234 2.83325 18.305 2.83325 10.1384C2.83325 6.53337 5.73825 3.6167 9.31992 3.6167C11.4433 3.6167 13.3216 4.64337 14.4999 6.23003C15.6783 4.64337 17.5683 3.6167 19.6799 3.6167C23.2616 3.6167 26.1666 6.53337 26.1666 10.1384C26.1666 18.305 18.6066 23.1234 15.2233 24.2784Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}