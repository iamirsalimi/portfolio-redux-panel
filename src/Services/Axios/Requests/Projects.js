import axios from "../AxiosInstance";

const getProjects = async () => {
    return await axios.get('Projects' , {
        params : {
            select : '*'
        }
    })
}

const addProject = async projectObj => {
    return await axios.post('/Projects' , projectObj)
}

const editProject = async (id , projectObj) => {
    return await axios.patch('/Projects' , projectObj , {
        params : {
            id : `eq.${id}`
        }
    })
}

const deleteProject = async id  => {
    return await axios.delete('/Projects' , {
        params : {
            id : `eq.${id}`
        }
    })
}

export {getProjects , addProject , editProject , deleteProject}