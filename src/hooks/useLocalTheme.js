import { useState } from "react"

export default function useLocalTheme() {
    const [localTheme, setLocalTheme] = useState(() => {
        let theme = localStorage.getItem('theme')
        if(theme){
            return theme
        }
        
        return 'light'
    })

    if(localTheme == 'dark'){
        document.documentElement.classList.add('dark')
    }

    return [localTheme , setLocalTheme]
}