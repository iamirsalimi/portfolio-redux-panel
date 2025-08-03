import PersonalInfos from './Pages/PersonalInfos/PersonalInfos'
import Experiences from './Pages/Experiences/Experiences'
import Educations from './Pages/Educations/Educations'

let routes = [
    {path:'/portfolio-redux-panel/' , element : <PersonalInfos /> },
    {path:'/portfolio-redux-panel/Experiences' , element : <Experiences /> },
    {path:'/portfolio-redux-panel/Educations' , element : <Educations /> }
]

export default routes