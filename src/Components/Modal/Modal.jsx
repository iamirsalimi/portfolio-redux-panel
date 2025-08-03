export default function Modal({title , showModalFlag , closeModal , removeHandler}) {
  return (
    <div className={`w-full z-50 !h-screen fixed top-0 left-0 flex items-center justify-center ${showModalFlag ? ' block' : 'hidden'}`}>
        <div className="w-full !h-screen bg-black/50 backdrop-blur-sm transition-all duration-500 fixed top-0 left-0" onClick={closeModal}></div>
        <div className="relative p-4 w-full max-w-md max-h-full -mt-20">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent transition-colors duration-100 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              data-modal-hide="popup-modal"
              onClick={closeModal}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg className="mx-auto mb-4 text-red-500 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this {title}?</h3>
              <button 
                data-modal-hide="popup-modal" 
                type="button" 
                className="text-white bg-red-600 transition-colors duration-100 hover:bg-red-700 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
                onClick={removeHandler}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 transition-colors duration-100 hover:bg-gray-100 hover:text-gray-800 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                onClick={closeModal}>No, cancel</button>
            </div>
          </div>
        </div>
    </div>
  )
}
