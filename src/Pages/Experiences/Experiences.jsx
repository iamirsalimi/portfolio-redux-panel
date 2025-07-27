import { useState } from 'react'

import Modal from './../../Components/Modal/Modal'
import { useForm } from "react-hook-form"
import { addExperience as addExperienceAction } from "../../Redux/ExperiencesSlice"
import { useDispatch, useSelector } from "react-redux"

export default function Experiences() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formStatus, setFormStatus] = useState('Add')

  let dispatch = useDispatch()

  let state = useSelector(state => state)
  // console.log(state)

  let {
    register,
    handleSubmit,
    formState: { error }
  } = useForm()

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const showUserInfos = () => {
    window.scrollTo(0, 0)
    setFormStatus('Edit')
  }

  const addExperience = data => {
    // console.log('add' , data)
    dispatch(addExperienceAction(data))    
  }
  
  const editExperience = data => {
    // console.log('update' , data)
    dispatch(addExperienceAction(data))
  }

  return (
    <>
      <div className="flex flex-col gap-5 relative">
        <div className="flex flex-col gap-4">
          <h1 className="text-sky-500 font-bold text-2xl">{formStatus} Experience</h1>
          <form className="w-full" onSubmit={handleSubmit(formStatus === 'Add' ? addExperience : editExperience)}>
            <div className="w-full grid grid-cols-1 gap-x-2 gap-y-4 mb-6 md:grid-cols-2">
              <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                <label for="ExperienceTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience Title</label>
                <input
                  type="text"
                  id="ExperienceTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Back-End Developer / Front-End Developer"
                  {...register('experienceTitle')}
                />
              </div>
              <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                <label for="Company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                <input
                  type="text"
                  id="Company"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Google,Amazon,..."
                  {...register('company')}
                />
              </div>
              <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                <label for="ExperienceTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time of work experience</label>
                <input
                  type="text"
                  id="ExperienceTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="2022 Summer"
                  {...register('time')}
                />
              </div>
              <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                <label for="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Montreal,NewYork,..."
                  {...register('city')}
                />
              </div>
              <div className="col-start-1 col-end-3">
                <label for="Country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <input
                  type="text"
                  id="Country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="UK,Germany,..."
                  {...register('city')}
                />
              </div>

              <div className="col-start-1 col-end-3">
                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your Experience Description here..."
                  {...register('description')}
                ></textarea>
              </div>

              <div className={`col-start-1 col-end-3 grid grid-cols-${formStatus == 'Edit' ? 2 : 1} gap-2`}>
                {formStatus === 'Edit' && (
                  <button
                    type="submit"
                    className="mt-2 text-white font-bold bg-red-700 transition-colors duration-200 hover:bg-red-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={() => setFormStatus('Add')}
                  >Cancel</button>
                )}

                <button
                  type="submit"
                  className="mt-2 text-white font-bold bg-blue-700 transition-colors duration-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >{formStatus}</button>
              </div>

            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-sky-500 font-bold text-2xl">Experiences</h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Experience Title
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    Time of Work Experience
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    Location
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                  </th>
                  <td className="px-6 py-2 text-center">
                    Front-End Developer Amazon
                  </td>
                  <td className="px-6 py-2 text-center">
                    summer 2023
                  </td>
                  <td className="px-6 py-2 text-center">
                    NewYork , US.
                  </td>
                  <td className="px-6 py-2 flex items-center justify-center gap-2">
                    <button
                      className="p-2 rounded-md bg-sky-200 hover:bg-sky-500 transition-colors duration-200 cursor-pointer group"
                      onClick={showUserInfos}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-2 stroke-sky-700 transition-colors duration-200 group-hover:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-md bg-red-200 hover:bg-red-500 transition-colors duration-200 cursor-pointer group"
                      onClick={handleOpenDeleteModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-2 stroke-red-700 transition-colors duration-200 group-hover:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* modal */}
      <Modal title="Experience" showModalFlag={showDeleteModal} closeModal={handleCloseDeleteModal} />

    </>
  )
}
