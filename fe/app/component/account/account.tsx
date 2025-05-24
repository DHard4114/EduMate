'use client'

import { useState, useEffect, useCallback} from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth-context'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { ApiError, ApiResponse, User } from './../../auth/AuthType';



export default function AccountPage() {
    const { user, setUser, refreshProfile } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        level: ''
    })
    const [profilePicture, setProfilePicture] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(false)

    // Update useEffect to use correct field name
    useEffect(() => {
        if (user === undefined || user === null) {
            return
        }

        setFormData({
            name: user.name || '',
            level: user.level || ''
        })

        // Change this to use profile_picture_url instead of profile_picture
        if (user.profile_picture_url) {
            setPreviewImage(user.profile_picture_url)
        }

        setLoading(false)
    }, [user])


    const getInitials = (name: string) => {
        if (!name) return '??'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfilePicture(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        if (shouldRedirect) {
            router.push('/auth')
        }
    }, [shouldRedirect, router])

    const fetchProfile = useCallback(async () => {
    try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
            setShouldRedirect(true)
            return
        }

        // Fix the API URL formatting
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') // Remove trailing slashes
        const response = await axios.get<ApiResponse<User>>(
            `${baseUrl}/user/profile`, // Ensure proper URL formatting
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        if (response.data.success && response.data.payload) {
            setUser(response.data.payload)
            setFormData({
                name: response.data.payload.name || '',
                level: response.data.payload.level || ''
            })
            if (response.data.payload.profile_picture_url) {
                setPreviewImage(response.data.payload.profile_picture_url)
            }
        }
    } catch (error: unknown) {
        console.error('Profile fetch error:', error)
        const apiError = error as ApiError
        
        // Improved error handling
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                setError('API endpoint not found. Please check your API URL configuration.')
                console.error('API URL:', process.env.NEXT_PUBLIC_API_URL)
            } else if (error.response?.status === 401) {
                setShouldRedirect(true)
            } else {
                setError(apiError.response?.data?.message || 'Failed to load profile')
            }
        } else {
                setError('An unexpected error occurred')
            }
        } finally {
            setLoading(false)
        }
    }, [setUser, setShouldRedirect, setFormData, setPreviewImage, setError]);

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const formDataToSend = new FormData()
            
            if (formData.name.trim()) formDataToSend.append('name', formData.name.trim())
            if (formData.level) formDataToSend.append('level', formData.level)
            if (profilePicture) formDataToSend.append('profile_picture', profilePicture)

            const token = localStorage.getItem('token')
            
            const response = await axios.patch<ApiResponse<User>>(
                `${process.env.NEXT_PUBLIC_API_URL}user/profile`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token ? `Bearer ${token}` : ''
                    },
                }
            )

            if (response.data.success) {
                setUser(response.data.payload)
                if (response.data.payload.profile_picture_url) {
                    setPreviewImage(response.data.payload.profile_picture_url)

                }
                setSuccess('Profile updated successfully!')
                await refreshProfile() // Refresh user data in context
            }
            
            setTimeout(() => setSuccess(''), 3000)
        } catch (error: unknown) {
            console.error('Profile update error:', error)
            const apiError = error as ApiError
            setError(apiError.response?.data?.message || 'Failed to update profile')
        }
    }

    const handleDeleteAccount = async () => {
        if (!user?.id) {
            setError('User ID not found')
            return
        }

        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token')
                
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}user/${user.id}`,
                    {
                        headers: {
                            'Authorization': token ? `Bearer ${token}` : ''
                        }
                    }
                )
                
                localStorage.removeItem('token')
                setUser(null)
                router.push('/auth')
            } catch (error: unknown) {
                console.error('Account deletion error:', error)
                const apiError = error as ApiError
                setError(apiError.response?.data?.message || 'Failed to delete account')
            }
        }
    }

    if (loading || user === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!user) {
        setShouldRedirect(true)
        return null
    }

    return (
        <>
            <Head>
                <title>My Account</title>
            </Head>

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-darkgreen flex items-center justify-center text-white">
                                    <span className="text-lg">
                                        {getInitials(user.name)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile-picture">
                                    Profile Picture
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        {previewImage ? (
                                            <Image
                                                src={previewImage}
                                                alt="Profile"
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 rounded-full object-cover"
                                                priority
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">
                                                    {getInitials(user.name)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            id="profile-picture"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="profile-picture"
                                            className="cursor-pointer bg-green hover:bg-fontgreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Change Photo
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Email - Read only */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email || ''}
                                    readOnly
                                    disabled
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed"
                                />
                                <p className="text-gray-500 text-xs italic mt-1">Email cannot be changed</p>
                            </div>

                            {/* Username - Read only if exists */}
                            {user.username && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={user.username}
                                        readOnly
                                        disabled
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed"
                                    />
                                    <p className="text-gray-500 text-xs italic mt-1">Username cannot be changed</p>
                                </div>
                            )}

                            {/* Role - Read only */}
                            {user.role && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={user.role}
                                        readOnly
                                        disabled
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed"
                                    />
                                    <p className="text-gray-500 text-xs italic mt-1">Role cannot be changed</p>
                                </div>
                            )}

                            {/* Name - Editable */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Level - Editable */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                                    Skill Level
                                </label>
                                <select
                                    id="level"
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select your level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <button
                                    type="submit"
                                    className="bg-green hover:bg-fontgreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>

                        <div className="border-t border-gray-200 pt-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Danger Zone</h2>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <h3 className="text-red-800 font-medium mb-2">Delete Account</h3>
                                <p className="text-red-600 text-sm mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}