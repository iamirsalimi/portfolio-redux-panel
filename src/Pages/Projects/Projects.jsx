import { useState, useRef, useEffect } from 'react'

import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { fetchProjects, addProject as addProjectHandler, editProject as editProjectHandler, removeProject } from '../../Redux/ProjectsSlice'

import Modal from '../../Components/Modal/Modal'
import Tag from '../../Components/Tag/Tag'
import Loading from '../../Components/Loading/Loading'
import InputError from '../../Components/InputError/InputError'

let toastId = null
let updateToastId = null
let removeToastId = null

export default function Skills() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formStatus, setFormStatus] = useState('Add')
  const [tagTitle, setTagTitle] = useState('')
  const [tags, setTags] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])

  // because we need the objects id to update them and also maybe user between updating an object decided to delete another object and we need another state for Id for removing objects 
  const [editId, setEditId] = useState(null)
  const [removeId, setRemoveId] = useState(null)

  const tagInputRef = useRef(null)

  let dispatch = useDispatch()

  let { err, status, projects } = useSelector(state => state.projects)
  // console.log(projects)

  console.log(projects, filteredProjects)

  let schema = yup.object().shape({
    projectTitle: yup.string()
      .min(3, 'ProjectTitle at least can be 3 letters')
      .required('ProjectTitle is required'),
    githubLink: yup.string()
      .required('githubLink is required'),
    projectDemoLink: yup.string()
      .required('projectDemoLink is required'),
    frameworkAndLanguages: yup.array()
      .min(1, 'you should add at least 1 framework or language')
      .required('frameworkAndLanguages is required'),
    description: yup.string()
      .min(10, 'Experience at least must be 10 letters')
      .required('description is required')
  })

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      frameworkAndLanguages: []
    },
    resolver: yupResolver(schema)
  })

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const showUserInfos = (project) => {
    window.scrollTo(0, 0)
    setFormStatus('Edit')
    setValue('projectTitle', project.projectTitle)
    setValue('githubLink', project.githubLink)
    setValue('projectDemoLink', project.projectDemoLink)
    setTags(project.frameworkAndLanguages)
    setValue('frameworkAndLanguages', project.frameworkAndLanguages)
    setValue('description', project.description)
  }

  const clearInputs = () => {
    setValue('projectTitle', '')
    setValue('githubLink', '')
    setValue('projectDemoLink', '')
    setTags([])
    setValue('frameworkAndLanguages', '')
    setValue('description', '')
  }

  const addProject = data => {
    toastId = toast.loading('adding Project...')
    dispatch(addProjectHandler({ toastId, newProjectObj: { ...data } }))
    clearInputs()
  }

  const editProject = data => {
    updateToastId = toast.loading('updating Project...')
    setFormStatus('Add')
    dispatch(editProjectHandler({ toastId: updateToastId, id: editId, newProjectObj: { ...data } }))
    clearInputs()
  }

  const removeProjectHandler = () => {
    removeToastId = toast.loading('removing Project...')
    dispatch(removeProject({ toastId: removeToastId, id: removeId }))
    handleCloseDeleteModal()
    // we should check if user decided to delete an projects while they was editing them (if we don't do this after deleting an object the edit form of that object is still usable and editing it may cause errors) , so we should change to form state to "Add" to don't face errors    
    if (removeId == editId) {
      setFormStatus('Add')
      clearInputs()
    }

  }

  const addTag = e => {
    e.preventDefault()

    if (tagTitle.trim()) {
      let newTag = {
        id: Math.floor(Math.random() * 999),
        title: tagTitle
      }
      // console.log('tags' , tags)
      setTags(prevTags => [...prevTags, newTag])
      setTagTitle('')
      tagInputRef.current.focus()
    }
  }

  const removeTagHandler = (e, tagId) => {
    e.preventDefault()
    setTags(prevTags => prevTags.filter(tag => tag.id !== tagId))
  }

  const filterProjectsArrayByProjectTitle = () => projects.filter(project => project.projectTitle.toLowerCase().includes(searchTitle.toLowerCase()))


  useEffect(() => {
    setValue('frameworkAndLanguages', [...tags])
  }, [tags])

  useEffect(() => {
    dispatch(fetchProjects())
  }, [])

  useEffect(() => {
    if (['fetch-succeed', 'add-succeed', 'remove-succeed', 'update-succeed'].includes(status) || projects.length > 0) {
      if (searchTitle) {
        setFilteredProjects(filterProjectsArrayByProjectTitle())
      } else {
        setFilteredProjects(projects)
      }
    }
  }, [projects, searchTitle])

  return (
    <>
      <div className="flex flex-col gap-5 relative">

        <div className="flex flex-col gap-4">
          <h1 className="text-sky-500 font-bold text-2xl">{formStatus} Project</h1>
          <form className="w-full" onSubmit={handleSubmit(formStatus === 'Add' ? addProject : editProject)}>
            <div className="w-full grid grid-cols-1 gap-x-2 gap-y-4 mb-6 md:grid-cols-2">
              <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                <label htmlFor="projectTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Title</label>
                <input
                  type="text"
                  id="projectTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary focus:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Portfolio,AdminPanel,..."
                  {...register('projectTitle')}
                />
                {errors.projectTitle && (
                  <InputError errText={errors.projectTitle.message} />
                )}
              </div>
              <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                <label htmlFor="githubLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Git Hub Link</label>
                <input
                  type="text"
                  id="githubLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary focus:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project GitHub Link"
                  {...register('githubLink')}
                />
                {errors.githubLink && (
                  <InputError errText={errors.githubLink.message} />
                )}
              </div>
              <div className="col-start-1 col-end-3">
                <label htmlFor="demoLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Demo Link</label>
                <input
                  type="text"
                  id="demoLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary focus:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project Demo Link"
                  {...register('projectDemoLink')}
                />
                {errors.projectDemoLink && (
                  <InputError errText={errors.projectDemoLink.message} />
                )}
              </div>
              <div className="relative col-start-1 col-end-3">
                <label htmlFor="frameworks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Framework and language used</label>
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    id="frameworks"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary focus:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="JavaScript,Django,React,..."
                    value={tagTitle}
                    onChange={e => setTagTitle(e.target.value)}
                    ref={tagInputRef}
                  />
                  <button
                    className="text-nowrap bg-sky-500 transition-colors duration-150 hover:bg-sky-600 text-white font-bold text-center p-1.5 rounded-md"
                    onClick={addTag}
                  >Add Tag</button>

                </div>
                {errors.frameworkAndLanguages && (
                  <InputError errText={errors.frameworkAndLanguages.message} />
                )}
              </div>
              {tags?.length != 0 && (
                <ul className="-mt-2 px-0.5 col-start-1 col-end-3 flex items-center gap-2 flex-wrap">
                  {tags?.map(tag => (
                    <Tag key={tag.id} {...tag} onRemove={removeTagHandler} />
                  ))
                  }
                </ul>
              )}

              <div className="col-start-1 col-end-3">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-primary focus:outline-none dark:border-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description about project here..."
                  {...register('description')}
                ></textarea>
                {errors.description && (
                  <InputError errText={errors.description.message} />
                )}
              </div>

              {/* <div className="col-start-1 col-end-3 flex flex-col items-start justify-center w-full">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</span>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-23 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or JPEG (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                </label>
              </div> */}

              <div className={`col-start-1 col-end-3 grid grid-cols-${formStatus == 'Edit' ? 2 : 1} gap-2`}>
                {formStatus === 'Edit' && (
                  <button
                    type="submit"
                    className="col-start-1 col-end-2 mt-2 text-white font-bold bg-red-700 transition-colors duration-200 hover:bg-red-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={() => {
                      setFormStatus('Add')
                      clearInputs()
                    }}
                  >Clear</button>
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
            <h1 className="text-sky-500 font-bold text-lg md:text-xl lg:text-2xl">Projects</h1>
            <div className="w-full xs:w-1/2 md:w-1/3 relative">
              <input
                type="text"
                id="Country"
                className="peer border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-secondary dark:outline-none dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Portfolio,Admin Panel,..."
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
              />
              <label htmlFor="Country" className="peer-focus:text-blue-500 transition-colors font-bold block mb-2 text-sm text-gray-500 dark:text-white absolute -top-4 left-5 bg-white dark:bg-secondary px-2 py-1">Search</label>
            </div>
          </div>
          <div className="relative w-full overflow-x-auto bg-gray-100 dark:bg-gray-900 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    Project Title
                  </th>

                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    Language and FrameWork Used
                  </th>

                  <th scope="col" className="px-6 py-3 text-center text-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!['pending' , 'fetch-failed'].includes(status) && filteredProjects.length != 0 && filteredProjects.map(project => (
                  <tr className={`border-b last:border-none border-gray-200 dark:border-gray-700 ${searchTitle ? 'bg-sky-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}`}>
                    <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {project.id}
                    </th>
                    <td className="px-6 py-2 text-center">
                      {project.projectTitle}
                    </td>
                    <td className="px-6 py-2 text-center max-w-52">
                      <ul className="flex items-center justify-center flex-wrap gap-1">
                        {project?.frameworkAndLanguages?.map(framework => (
                          <li key={framework.id} className="group">
                            <span className="text-nowrap text-gray-300 dark:text-gray-600 group-first:hidden"> ,</span> {framework.title}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-2 flex items-center justify-center gap-2">
                      <button
                        className="p-2 rounded-md bg-sky-200 hover:bg-sky-500 transition-colors duration-200 cursor-pointer group"
                        onClick={() => {
                          showUserInfos(project)
                          setEditId(project.id)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-2 stroke-sky-700 transition-colors duration-200 group-hover:stroke-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-md bg-red-200 hover:bg-red-500 transition-colors duration-200 cursor-pointer group"
                        onClick={() => {
                          handleOpenDeleteModal()
                          setRemoveId(project.id)
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

            {['fetch-succeed', 'add-succeed', 'remove-succeed', 'update-succeed'].includes(status) && projects.length == 0 && (
              <span className="inline-block w-full text-center text-sky-500 font-semibold !my-2">there is no Project yet</span>
            )}

            {status == 'pending' && (
              <Loading title="Project" />
            )}

            {status == 'fetch-failed' && (
              <span className="inline-block w-full text-center text-red-500 font-semibold !my-2">{err}</span>
            )}

            {['fetch-succeed', 'add-succeed', 'remove-succeed', 'update-succeed'].includes(status) && filteredProjects.length == 0 && searchTitle && (
              <span className="inline-block w-full text-center text-red-500 font-semibold !my-2">There is no Project with "{searchTitle}" Title</span>
            )}
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal title="Project" showModalFlag={showDeleteModal} closeModal={handleCloseDeleteModal} removeHandler={removeProjectHandler} />
    </>
  )
}