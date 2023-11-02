
interface WhatsappIcon {
    iconWidth?: number
    iconHeight?: number
    strokeColor?: string

}

export const WhatsappIcon = ({ iconHeight = 25, iconWidth = 24, strokeColor = '#122533' }: WhatsappIcon) => {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox={`0 0 ${iconWidth} ${iconHeight}`} fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 12.375C0 19.0024 5.37258 24.375 12 24.375C18.6274 24.375 24 19.0024 24 12.375C24 5.74758 18.6274 0.375 12 0.375C5.37258 0.375 0 5.74758 0 12.375ZM19.5311 11.9158C19.5295 15.8491 16.3297 19.0497 12.3955 19.0513H12.3926C11.1984 19.0508 10.0249 18.7512 8.98267 18.1827L5.2 19.175L6.21231 15.4774C5.58787 14.3953 5.25929 13.1677 5.25982 11.9101C5.26139 7.97585 8.46241 4.775 12.3955 4.775C14.3043 4.77582 16.0959 5.51893 17.4431 6.86771C18.7903 8.21641 19.5318 10.0092 19.5311 11.9158Z" fill={strokeColor} />
            <path fillRule="evenodd" clipRule="evenodd" d="M6.91325 17.4795L9.15794 16.8907L9.37451 17.0192C10.2851 17.5596 11.3289 17.8455 12.3931 17.8459H12.3955C15.6644 17.8459 18.325 15.1853 18.3263 11.9151C18.3269 10.3304 17.7106 8.8403 16.5908 7.71926C15.4711 6.59821 13.982 5.98053 12.3979 5.97998C9.12647 5.97998 6.4659 8.64032 6.4646 11.9103C6.46414 13.0309 6.7777 14.1223 7.37138 15.0666L7.5124 15.291L6.91325 17.4795ZM15.7462 13.4518C15.8706 13.5119 15.9545 13.5525 15.9904 13.6123C16.035 13.6867 16.035 14.0436 15.8865 14.4602C15.7378 14.8766 15.0255 15.2568 14.683 15.3079C14.3758 15.3539 13.9871 15.373 13.56 15.2373C13.301 15.1551 12.9689 15.0454 12.5436 14.8617C10.8721 14.14 9.74253 12.52 9.52904 12.2138C9.51408 12.1923 9.50362 12.1773 9.49779 12.1695L9.49635 12.1676C9.40199 12.0417 8.76977 11.1982 8.76977 10.3251C8.76977 9.50388 9.17319 9.07341 9.35888 8.87527C9.37161 8.86169 9.38331 8.84921 9.39378 8.83776C9.55721 8.65926 9.75038 8.61464 9.86923 8.61464C9.98808 8.61464 10.1071 8.61574 10.211 8.62095C10.2238 8.6216 10.2371 8.62152 10.2509 8.62144C10.3548 8.62083 10.4843 8.62007 10.6121 8.92701C10.6613 9.04514 10.7332 9.22026 10.8091 9.40497C10.9625 9.77847 11.132 10.1911 11.1618 10.2509C11.2064 10.3401 11.2361 10.4442 11.1767 10.5632C11.1678 10.5811 11.1595 10.5979 11.1516 10.614C11.107 10.7052 11.0741 10.7722 10.9984 10.8606C10.9686 10.8954 10.9378 10.9329 10.907 10.9704C10.8457 11.0451 10.7843 11.1198 10.7309 11.173C10.6417 11.2619 10.5488 11.3584 10.6528 11.5369C10.7568 11.7154 11.1146 12.2992 11.6446 12.772C12.2144 13.2802 12.7096 13.495 12.9606 13.6039C13.0096 13.6251 13.0493 13.6424 13.0784 13.6569C13.2567 13.7462 13.3607 13.7313 13.4647 13.6123C13.5687 13.4933 13.9104 13.0917 14.0292 12.9132C14.1481 12.7348 14.267 12.7645 14.4304 12.824C14.5938 12.8835 15.4704 13.3148 15.6487 13.4041C15.6835 13.4215 15.7161 13.4372 15.7462 13.4518Z" fill={strokeColor} />
        </svg>

    )
}
