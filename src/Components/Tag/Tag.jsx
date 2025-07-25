export default function Tag({id , title , onRemove}) {
    return (
        <li className="p-1 pl-2 w-fit select-none rounded-md font-bold text-center text-sky-500 border border-sky-500 flex items-center justify-center gap-2">
            <span>{title}</span>
            <button onClick={e => onRemove(e, id)} className="p-1 rounded-md hover:bg-sky-200 transition-colors duration-150 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 stroke-sky-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </li>
    )
}
