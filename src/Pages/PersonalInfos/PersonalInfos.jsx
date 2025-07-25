import { useState } from "react"

export default function PersonalInfos() {
    const [formStatus, setFormStatus] = useState('Add')

    const addPersonalInfo = e => {
        alert('add PersonalInfo')
    }

    const editPersonalInfo = e => {
        alert('edi tPersonalInfo')
    }


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-sky-500 font-bold text-2xl">Personal Informations</h1>
                
            </div>
            <form className="w-full">
                <div class="w-full grid grid-cols-1 gap-x-2 gap-y-4 mb-6 md:grid-cols-2">
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="Expertise" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expertise</label>
                        <input type="text" id="Expertise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Back-End / Front-End" required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="Email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" id="Email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Test@gmail.com" required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="FullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="FullName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Brad Pit" required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="experience" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Years Of Experience</label>
                        <input type="number" id="experience" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2,3,..." required />
                    </div>
                    <div className="col-start-1 col-end-3">
                        <label for="Clients" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Satisfied Clients</label>
                        <input type="number" id="Clients" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="25,26,..." required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="linkedinLink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Linkedin Link</label>
                        <input type="text" id="linkedinLink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Linkedin Link" required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="instagramLink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram Link</label>
                        <input type="text" id="instagramLink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Instagram Link" required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="xLink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">X Link</label>
                        <input type="text" id="xLink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your X Link" required />
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="githubLink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub Link</label>
                        <input type="text" id="githubLink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your GitHub Link" required />
                    </div>
                    
                    <div className="col-start-1 col-end-3">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Biography here..."></textarea>
                    </div>

                    <div class="col-start-1 col-end-3 flex flex-col items-start justify-center w-full">
                        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</span>
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-23 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or JPEG (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" accept="image/*" />
                        </label>
                    </div>

                    <div className={`col-start-1 col-end-3 grid grid-cols-2 gap-2`}>
                        <button
                            type="submit"
                            className="mt-2 text-white font-bold bg-red-700 transition-colors duration-200 hover:bg-red-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            onClick={() => setFormStatus('Add')}
                        >Clear</button>

                        <button
                            type="submit"
                            className="mt-2 text-white font-bold bg-blue-700 transition-colors duration-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={formStatus === 'Add' ? addPersonalInfo : editPersonalInfo}
                        >{formStatus}</button>
                    </div>

                </div>
            </form>
        </div>
    )
}
