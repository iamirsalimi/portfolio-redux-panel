import { useState } from 'react'

import { NavLink } from 'react-router-dom'

const links = [
    {
        title: 'Personal Informations', svg: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-colors duration-200 w-5 h-5 text-gray-500  group-hover:text-gray-900 dark:group-hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>)
    },
    {
        title: 'Experiences', svg: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-colors duration-200 flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>)
    },
    {
        title: 'Educations', svg: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-colors duration-200 flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>)
    },
]

export default function SideBar({ theme, changeTheme }) {
    const [showPanel, setShowPanel] = useState(false)

    return (
        <>
            <div className="flex items-center justify-between pr-5 bg-white dark:bg-secondary px-2 py-2">
                <div className="flex items-center justify-center gap-2">
                    <button
                        data-drawer-target="default-sidebar"
                        data-drawer-toggle="default-sidebar"
                        aria-controls="default-sidebar"
                        type="button"
                        className="flex items-center p-2 rounded-xl border bg-white text-light-gray dark:text-white border-gray-300 dark:border-none hover:bg-black/5 dark:hover:bg-white/5 dark:bg-primary cursor-pointer transition-all"
                        onClick={() => setShowPanel(prev => !prev)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <button onClick={changeTheme} className="flex items-center p-2 rounded-xl border bg-white text-light-gray dark:text-white border-gray-300 dark:border-none hover:bg-black/5 dark:hover:bg-white/5 dark:bg-primary cursor-pointer transition-all">
                        {theme == 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-2xl">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-2xl">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>
                </div>


                <h1 className="text-slate-700 dark:text-white font-bold text-center text-2xl sm:hidden">Portfolio Panel</h1>
            </div>

            <div className={`z-[39] bg-black/50 fixed top-0 left-0 w-full h-full transition-all duration-200 sm:hidden ${showPanel ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowPanel(false)}></div>

            <aside id="default-sidebar" className={`z-40 w-64 h-screen transition-transform fixed sm:!translate-x-0 ${showPanel ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
                <div className="z-[42] h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-primary space-y-5">
                    <div className="flex items-center justify-center sm:justify-between">
                        <h1 className="text-slate-700 dark:text-white font-bold text-center text-2xl">Portfolio Panel</h1>
                        <button onClick={changeTheme} className="hidden sm:flex items-center p-2 rounded-xl border bg-white text-light-gray dark:text-white border-gray-300 dark:border-none hover:bg-black/5 dark:hover:bg-white/5 dark:bg-secondary cursor-pointer transition-all">
                            {theme == 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-2xl">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-2xl">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {links.map(link => (
                            <li onClick={() => setShowPanel(false)}>
                                <NavLink to={`/${link.title === 'Personal Informations' ? '' : link.title}`} className="flex items-center transition-colors duration-200 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-black/20 group" end>
                                    {link.svg}
                                    <span className="flex-1 ms-3 whitespace-nowrap font-bold text-gray-600 dark:text-gray-500">{link.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}
