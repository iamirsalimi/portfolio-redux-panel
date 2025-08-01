import axios from "../AxiosInstance";

const getExperiences = async () => {
    return await axios.get('/Experiences' , {
        params : {
            select : '*'
        }
    })
}

const addExperience = async (data) => {
    return await axios.post('/Experiences' , data)
}

const updateExperience = async (id , data) => {
    console.log(data)
    return await axios.patch('/Experiences' , data , {
        params : {
            id : `eq.${id}`
        }
    })
}

const deleteExperience = async (id) => {
    return await axios.delete('/Experiences', {
        params : {
            id : `eq.${id}`
        }
    })
}

export {getExperiences , addExperience , updateExperience , deleteExperience}