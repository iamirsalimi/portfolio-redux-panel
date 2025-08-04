export default function Tag({id , title , onRemove}) {
    return (
        <li className="p-1 pl-2 w-fit select-none rounded-md font-bold text-center text-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white border border-gray-700 dark:border-gray-500 hover:border-gray-900 dark:hover:border-white flex items-center justify-center gap-2 transition-all">
            <span>{title}</span>
            <button onClick={e => onRemove(e, id)} className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/5 hover:text-white transition-colors duration-150 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 stroke-gray-700 dark:stroke-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </li>
    )
}
