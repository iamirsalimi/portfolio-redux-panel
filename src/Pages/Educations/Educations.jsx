import { useState, useEffect } from 'react'

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { fetchEducations, postEducation, editEducation as editEducationHandler, removeEducation as removeEducationHandler } from "./../../Redux/EducationsSlice"

import Modal from './../../Components/Modal/Modal'
import Loading from '../../Components/Loading/Loading'
import InputError from '../../Components/InputError/InputError'

let toastId = null
let updateToastId = null
let removeToastId = null

export default function Educations() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formStatus, setFormStatus] = useState('Add')
  const [searchTitle, setSearchTitle] = useState('')
  const [filteredEducations, setFilteredEducations] = useState([])
  // because we need the objects id to update them and also maybe user between updating an object decided to delete another object and we need another state for Id for removing objects 
  const [editId, setEditId] = useState(null)
  const [removeId, setRemoveId] = useState(null)

  let dispatch = useDispatch()

  // get educations from state
  let { status, err, educations } = useSelector(state => state.educations)
  // console.log(educations)

  let schema = yup.object().shape({
    major: yup.string()
      .min(3, 'ExperienceTitle at least can be 3 letters')
      .required('major is required'),
    university: yup.string()
      .required('university is required'),
    time: yup.string()
      .required('time is required'),
    country: yup.string()
      .required('country is required'),
    description: yup.string()
      .min(10, 'Experience at least must be 10 letters')
      .required('description is required')
  })

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const showUserInfos = education => {
    window.scrollTo(0, 0)
    setFormStatus('Edit')
    setValue('major', education.major)
    setValue('university', education.university)
    setValue('time', education.time)
    setValue('country', education.country)
    setValue('description', education.description)
  }

  const clearInputs = () => {
    setValue('major', '')
    setValue('university', '')
    setValue('time', '')
    setValue('country', '')
    setValue('description', '')
  }

  const addEducation = data => {
    console.log('add', data, { toastId, newEducationObj: { ...data } })
    toastId = toast.loading('adding Education...')
    dispatch(postEducation({ toastId, newEducationObj: { ...data } }))
    clearInputs()
  }

  const editEducation = data => {
    // console.log('update', data)
    updateToastId = toast.loading('updating Education...')
    setFormStatus('Add')
    dispatch(editEducationHandler({ toastId: updateToastId, id: editId, newEducationObj: { ...data } }))
    clearInputs()
  }

  const removeEducation = () => {
    removeToastId = toast.loading('removing Education...')
    dispatch(removeEducationHandler({ toastId: removeToastId, id: removeId }))
    handleCloseDeleteModal()
    // we should check if user decided to delete an education while they was editing them (if we don't do this after deleting an object the edit form of that object is still usable and editing it may cause errors) , so we should change to form state to "Add" to don't face errors    
    if (removeId == editId) {
      setFormStatus('Add')
      clearInputs()
    }
  }

  const filterEducationsArrayByMajor = () => educations.filter(education => education.major.toLowerCase().includes(searchTitle.toLowerCase()))

  useEffect(() => {
    dispatch(fetchEducations())
  }, [])

  useEffect(() => {
    if (status == 'fetch-succeed' || educations.length > 0) {
      if (searchTitle) {
        setFilteredEducations(filterEducationsArrayByMajor())
      } else {
        setFilteredEducations(educations)
      }
    }
  }, [educations , searchTitle])

  return (
    <>
      <div className="flex flex-col gap-5 relative">

        <div className="flex flex-col gap-4">
          <h1 className="text-sky-500 font-bold text-2xl">{formStatus} Education</h1>
          <form className="w-full" onSubmit={handleSubmit(formStatus === 'Add' ? addEducation : editEducation)}>
            <div className="w-full grid grid-cols-1 gap-x-2 gap-y-4 mb-6 md:grid-cols-2">
              <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                <label for="EducationTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Education Title</label>
                <input
                  type="text"
                  id="EducationTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary dark:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="SoftWare Engineering /Cyber Security"
                  {...register('major')}
                />
                {errors.major && (
                  <InputError errText={errors.major.message} />
                )}
              </div>
              <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                <label for="university" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">place of study</label>
                <input
                  type="text"
                  id="university"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary dark:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cambridge,Harvard,..."
                  {...register('university')}
                />
                {errors.university && (
                  <InputError errText={errors.university.message} />
                )}
              </div>
              <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                <label for="EducationTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time of work Education</label>
                <input
                  type="text"
                  id="EducationTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary dark:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Summer 2022"
                  {...register('time')}
                />
                {errors.time && (
                  <InputError errText={errors.time.message} />
                )}
              </div>
              <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                <label for="Country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <input
                  type="text"
                  id="Country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary dark:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="UK,Germany,..."
                  {...register('country')}
                />
                {errors.country && (
                  <InputError errText={errors.country.message} />
                )}
              </div>

              <div className="col-start-1 col-end-3">
                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 min-h-20 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-primary dark:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your Education Description here..."
                  {...register('description')}
                ></textarea>
                {errors.description && (
                  <InputError errText={errors.description.message} />
                )}
              </div>

              <div className={`col-start-1 col-end-3 grid grid-cols-${formStatus == 'Edit' ? 2 : 1} gap-2`}>
                {formStatus === 'Edit' && (
                  <button
                    type="submit"
                    className="col-start-1 col-end-2 mt-2 text-white font-bold bg-red-700 transition-colors duration-200 hover:bg-red-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={() => {
                      setFormStatus('Add')
                      clearInputs()
                    }}
                  >Cancel</button>
                )}

                <button
                  type="submit"
                  className={`${formStatus == 'Edit' ? 'col-start-2' : 'col-start-1'} col-end-3 mt-2 text-white font-bold bg-blue-700 transition-colors duration-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >{formStatus}</button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-5">
            <h1 className="text-sky-500 font-bold text-lg md:text-xl lg:text-2xl">Educations</h1>
            <div className="w-full xs:w-1/2 md:w-1/3 relative">
              <input
                type="text"
                id="Country"
                className="peer border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-secondary dark:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="IT,Cyber Security,..."
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
              />
              <label for="Country" className="peer-focus:text-blue-500 transition-colors font-bold block mb-2 text-sm text-gray-500 dark:text-white absolute -top-4 left-5 bg-white dark:bg-secondary px-2 py-1">Search</label>
            </div>
          </div>

          <div className="relative w-full overflow-x-auto bg-gray-100 dark:bg-gray-900 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-lg">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    Education Title
                  </th>

                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    University
                  </th>

                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    Location
                  </th>

                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {status != 'pending' && filteredEducations?.map(education => (
                  <tr key={education.id} className={`border-b last:border-none border-gray-300 dark:border-gray-700 ${searchTitle ? 'bg-sky-100' : 'bg-white dark:bg-gray-800'}`}>
                    <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {education.id}
                    </th>
                    <td className="px-6 py-2 text-center">
                      {education.major}
                    </td>
                    <td className="px-6 py-2 text-center">
                      {education.university}
                    </td>
                    <td className="px-6 py-2 text-center">
                      {education.country}
                    </td>
                    <td className="px-6 py-2 flex items-center justify-center gap-2">
                      <button
                        className="p-2 rounded-md bg-sky-200 hover:bg-sky-500 transition-colors duration-200 cursor-pointer group"
                        onClick={() => {
                          setEditId(education.id)
                          showUserInfos(education)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-2 stroke-sky-700 transition-colors duration-200 group-hover:stroke-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-md bg-red-200 hover:bg-red-500 transition-colors duration-200 cursor-pointer group"
                        onClick={() => {
                          setRemoveId(education.id)
                          handleOpenDeleteModal()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-2 stroke-red-700 transition-colors duration-200 group-hover:stroke-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {['fetch-succeed', 'add-succeed', 'remove-succeed', 'update-succeed'].includes(status) && educations.length == 0 && (
              <span className="inline-block w-full text-center text-sky-500 font-semibold !my-2">there is no Education yet</span>
            )}

            {status == 'pending' && (
              <Loading title="Education" />
            )}

            {status == 'fetch-failed' && (
              <span className="inline-block w-full text-center text-red-500 font-semibold !my-2">{err}</span>
            )}

            {filteredEducations.length == 0 && searchTitle && (
              <span className="inline-block w-full text-center text-red-500 font-semibold !my-2">There is no Education with "{searchTitle}" Title</span>
            )}
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal title="Education" showModalFlag={showDeleteModal} closeModal={handleCloseDeleteModal} removeHandler={removeEducation} />
    </>
  )
}
