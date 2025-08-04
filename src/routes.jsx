import PersonalInfos from './Pages/PersonalInfos/PersonalInfos'
import Experiences from './Pages/Experiences/Experiences'
import Educations from './Pages/Educations/Educations'
import Projects from './Pages/Projects/Projects'

let routes = [
    {path:'/' , element : <PersonalInfos /> },
    {path:'/Experiences' , element : <Experiences /> },
    {path:'/Educations' , element : <Educations /> },
    {path:'/Projects' , element : <Projects /> }
]

export default routes