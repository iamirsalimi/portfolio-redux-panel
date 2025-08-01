import axios from "../AxiosInstance";

const getEducations = async () => {
    return await axios.get('/Educations' , {
        params : {
            select : '*'
        }
    })
}

const addEducation = async (data) => {
    return await axios.post('/Educations' , data)
}

const updateEducation = async (id , data) => {
    return await axios.patch('/Educations' , data , {
        params : {
            id : `eq.${id}`
        }
    })
}

const deleteEducation = async (id) => {
    return await axios.delete('/Educations', {
        params : {
            id : `eq.${id}`
        }
    })
}

export {getEducations , addEducation , updateEducation , deleteEducation}