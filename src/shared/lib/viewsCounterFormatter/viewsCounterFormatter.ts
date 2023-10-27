
export const viewsCounterFormatter = (viewsCount: number): string => {
    if (viewsCount % 10 === 1 && viewsCount % 100 !== 11) {
        return `${viewsCount} просмотр`
    } else if (viewsCount % 10 >= 2 && viewsCount % 10 <= 4 && (viewsCount % 100 < 10 || viewsCount % 100 >= 20)) {
        return `${viewsCount} просмотра`
    }
    return `${viewsCount} просмотров`
}