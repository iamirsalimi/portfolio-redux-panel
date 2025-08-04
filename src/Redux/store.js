import { configureStore } from '@reduxjs/toolkit'

import PersonalInformationReducer from './PersonalInformationSlice'; 
import EducationsReducer from './EducationsSlice'; 
import ExperiencesReducer from './ExperiencesSlice'; 
import ProjectsReducer from './ProjectsSlice'; 

let store = configureStore({
    reducer : {
        personalInformation : PersonalInformationReducer,
        educations : EducationsReducer,
        experiences : ExperiencesReducer,
        projects : ProjectsReducer
    }
})

export default store