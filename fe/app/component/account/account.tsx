'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth-context'
import Head from 'next/head'
import api from '@/app/lib/api'

export default function AccountPage() {
    const { user, setUser } = useAuth()
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

    // Initialize form data with user data
    useEffect(() => {
        if (user === undefined || user === null) {
            return
        }

        // Update form data when user is available
        setFormData({
            name: user.name || '',
            level: user.level || ''
        })

        if (user.profile_picture_url) {
            setPreviewImage(user.profile_picture_url)
        }

        setLoading(false)
    }, [user])

    const getInitials = (name: string) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const formDataToSend = new FormData()
            
            if (formData.name) formDataToSend.append('name', formData.name)
            if (formData.level) formDataToSend.append('level', formData.level)
            if (profilePicture) formDataToSend.append('profile_picture', profilePicture)

            const response = await api.patch('/user/profile', formDataToSend);

            setUser(response.data.payload)
            setSuccess('Profile updated successfully!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile')
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await api.delete(`/user/${user?.id}`)
                router.push('/auth')
                // Logout after account deleted
                localStorage.removeItem('token')
                setUser(null)
                router.push('/auth')
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to delete account')
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
                                        {user ? getInitials(user.name) : '??'}
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
                                            <img
                                                src={previewImage}
                                                alt="Profile"
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">
                                                    {user ? getInitials(user.name) : '??'}
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

                            {/* Email */}
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

                            {/* Username */}
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
                                />
                            </div>

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