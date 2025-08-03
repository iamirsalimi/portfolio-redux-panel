export default function Loading({title}) {
    return (
        <span className="flex items-center justify-center gap-2 w-full text-center text-sky-500 font-semibold !my-2">
            <span>getting {title} List</span>
            <span className="w-4 h-4 border-2 border-gray-300 dark:border-gray-700 !border-t-sky-500 rounded-full animate-spin"></span>
        </span>
    )
}
