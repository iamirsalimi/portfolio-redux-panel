import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { fetchPersonalInformation, editPersonalInformation } from "../../Redux/PersonalInformationSlice"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import InputError from "../../Components/InputError/InputError"

let toastId = null;

export default function PersonalInfos() {
    let dispatch = useDispatch()

    let { status, err, personalInformation } = useSelector(state => state.personalInformation)
    // console.log(state)

    let schema = yup.object().shape({
        fullName: yup.string()
            .min(5, 'fullName at least can be 5 letters')
            .required('fullName is required'),
        experience: yup.number('Experience should be number')
            .min(0, 'Experience at least can be 0')
            .required('experience is required'),
        email: yup.string()
            .email('email is not valid')
            .required('email is required'),
        expertise: yup.string()
            .required('expertise is required'),
        satisfiedClients: yup.number('satisfiedClients should be number')
            .required('satisfiedClients is required'),
        linkedinLink: yup.string()
            .notRequired(),
        instagramLink: yup.string()
            .notRequired(),
        XLink: yup.string()
            .notRequired(),
        githubLink: yup.string()
            .notRequired(),
        biography: yup.string()
            .required('biography is required'),
    })

    let {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema)
    })

    // const checkChanges = data => JSON.stringify(personalInformation) == JSON.stringify(data) 

    const editPersonalInfo = data => {

        // if(checkChanges(data)) {
        //     toast.error('New Information is same as old one')
        //     return ;
        // } 
        // to have the id of toast , in case if our request got fulfilled or rejected
        toastId = toast.loading('editing your details')
        dispatch(editPersonalInformation(data))
    }

    useEffect(() => {
        dispatch(fetchPersonalInformation())
    }, [])

    useEffect(() => {
        // console.log(personalInformation)
        if (status == 'succeed') {
            let { fullName, experience, email, expertise, satisfiedClients, linkedinLink, instagramLink, XLink, githubLink, biography } = personalInformation
            setValue('fullName', fullName)
            setValue('experience', experience)
            setValue('email', email)
            setValue('expertise', expertise)
            setValue('satisfiedClients', satisfiedClients)
            setValue('linkedinLink', linkedinLink)
            setValue('instagramLink', instagramLink)
            setValue('XLink', XLink)
            setValue('githubLink', githubLink)
            setValue('biography', biography)
        }
    }, [personalInformation])

    useEffect(() => {
        // to check if details updated or faced an error close loading toast and show the error or success toast
        if (['succeed', 'failed'].includes(status) && toastId != null) {
            toast.dismiss(toastId)
            toastId = null
        }
    }, [status])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-sky-500 font-bold text-2xl">Personal Informations</h1>

            </div>
            <form className="w-full" onSubmit={handleSubmit(editPersonalInfo)}>
                <div className="w-full grid grid-cols-1 gap-x-2 gap-y-4 mb-6 md:grid-cols-2">
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="FullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input
                            type="text"
                            id="FullName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Brad Pit"
                            {...register('fullName')}
                        />
                        {errors.fullName && (
                            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Years Of Experience</label>
                        <input
                            type="number"
                            id="experience"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="2,3,..."
                            {...register('experience')}
                        />
                        {errors.experience && (
                            <InputError errText={errors.experience.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="text"
                            id="Email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Test@gmail.com"
                            {...register('email')}
                        />
                        {errors.email && (
                            <InputError errText={errors.email.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="Expertise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expertise</label>
                        <input
                            type="text"
                            id="Expertise"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Back-End / Front-End"
                            {...register('expertise')}
                        />
                        {errors.expertise && (
                            <InputError errText={errors.expertise.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3">
                        <label for="Clients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Satisfied Clients</label>
                        <input
                            type="number"
                            id="Clients"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="25,26,..."
                            {...register('satisfiedClients')}
                        />
                        {errors.satisfiedClients && (
                            <InputError errText={errors.satisfiedClients.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="linkedinLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Linkedin Link</label>
                        <input
                            type="text"
                            id="linkedinLink"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your Linkedin Link"
                            {...register('linkedinLink')}
                        />
                        {errors.linkedinLink && (
                            <InputError errText={errors.linkedinLink.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="instagramLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram Link</label>
                        <input
                            type="text"
                            id="instagramLink"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your Instagram Link"
                            {...register('instagramLink')}
                        />
                        {errors.instagramLink && (
                            <InputError errText={errors.instagramLink.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-2">
                        <label for="xLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">X Link</label>
                        <input
                            type="text"
                            id="xLink"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your X Link"
                            {...register('XLink')}
                        />
                        {errors.XLink && (
                            <InputError errText={errors.XLink.message} />
                        )}
                    </div>
                    <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
                        <label for="githubLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub Link</label>
                        <input
                            type="text"
                            id="githubLink"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your GitHub Link"
                            {...register('githubLink')}
                        />
                        {errors.githubLink && (
                            <InputError errText={errors.githubLink.message} />
                        )}
                    </div>

                    <div className="col-start-1 col-end-3">
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full min-h-36 lg:min-h-28 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-primary  dark:border-none focus:outline-none dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your Biography here..."
                            {...register('biography')}
                        ></textarea>
                        {errors.biography && (
                            <InputError errText={errors.biography.message} />
                        )}
                    </div>

                    {/* <div className="col-start-1 col-end-3 flex flex-col items-start justify-center w-full">
                        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</span>
                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-23 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-primary  hover:bg-none focus:outline-none dark:border-gray-600 dark:hover:border-gray-500">
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

                    <button
                        type="submit"
                        className="col-start-1 col-end-3 mt-2 text-white font-bold bg-blue-700 disabled:bg-blue-300 transition-colors duration-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={status == 'loading'}
                    >{status == 'loading' ? 'Editing ...' : 'Edit'}</button>

                </div>
            </form>
        </div>
    )
}
