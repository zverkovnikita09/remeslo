import { getData } from "@shared/lib/api"

interface cityResponseData {
    location: {
        data: {
            city: string
        }
    }
}

export const getUserIp = async () => {
    const data: { ip: string } = await getData({ baseUrl: '', url: 'https://api.ipify.org?format=json&callback=getIP' })
    /* const data = await getData<string>({url: '/api/v1/maintenance/' }) */
    return data?.ip;
}

export const getUserCity = async (ipAdress: string) => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";

    const data = await getData<cityResponseData>({
        baseUrl: '',
        url: url + ipAdress,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + 'bfb0bf13ebd33709d153118f550bf36c73f78430'
        }
    })

    return data;
}