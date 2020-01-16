import request from '../../utils/http.js'

export const getHouses = (
    {
        cityId,filter,start=1,end=20
    }
) => {
  return request(`/houses`,{
      params: {
         cityId: cityId,
         ...filter,
         start: start,
         end:end
      }
  })
}
