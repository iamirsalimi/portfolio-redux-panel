import axios from '../AxiosInstance'

const getPersonalInformation = async () => {
    return await axios.get('/PersoanlInformations' , {
        params : {
            select : '*'
        }
    })
}


const updatePersonalInformation = async (newPersonalInfos) => {
    return await axios.patch('/PersoanlInformations' ,newPersonalInfos , {
        params : {
            id : 'eq.1'
        }
    })
}

export {getPersonalInformation , updatePersonalInformation}