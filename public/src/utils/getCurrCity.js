import { getAreaInfo } from '../pages/Index/api.js'

import { getCity, setCity } from './city.js'
// const { BMap } = window

const getCurrCity = () => {
    const curr = getCity()
    if(!curr) {
        return new Promise( resolve => {
            const myCity = new window.BMap.LocalCity()
            myCity.get(async result => {
                const cityName = result.name
                const { data } = await getAreaInfo( cityName )
                if(data.status === 200) {
                    setCity(data.body)
                    resolve(data.body)
                }
            })   
        })
    }else {
        return Promise.resolve(curr)
    }
}

export { getCurrCity, setCity, getCity }