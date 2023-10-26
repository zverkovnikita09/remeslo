interface GetDataProps {
    url?: string
    dataFlag?: boolean // флаг для получения данных или респонса

}

interface DataResponse<T> {
    data: T
    status: 'OK' | 'Not Found' | 'Internal Server Error'
    message: string
}

export const getData = async <T extends {}> ({ dataFlag, url }:GetDataProps) => {
    const response= await fetch(`https://remeslo.pisateli-studio.ru/${url}`)
    if (!response.ok) {
        throw new Error('Something went`s wrong');
    }
    const data:DataResponse<T> = await response.json();
    return dataFlag ? data.data : data;
}