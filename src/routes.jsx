import PersonalInfos from './Pages/PersonalInfos/PersonalInfos'
import Experiences from './Pages/Experiences/Experiences'
import Educations from './Pages/Educations/Educations'

let routes = [
    {path:'/' , element : <PersonalInfos /> },
    {path:'/Experiences' , element : <Experiences /> },
    {path:'/Educations' , element : <Educations /> }
]

export default routes