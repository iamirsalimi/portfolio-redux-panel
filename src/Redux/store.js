import { configureStore } from '@reduxjs/toolkit'

import PersonalInformationReducer from './PersonalInformation'; 
import EducationsReducer from './EducationsSlice'; 
import ExperiencesReducer from './ExperiencesSlice'; 

let store = configureStore({
    reducer : {
        personalInformation : PersonalInformationReducer,
        educations : EducationsReducer,
        experiences : ExperiencesReducer
    }
})

export default store