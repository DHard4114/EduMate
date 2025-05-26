'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiUsers, FiBook, FiLoader } from 'react-icons/fi'
import { motion } from 'framer-motion'
import api from '../../../lib/api'
import { ApiResponse } from '../Types'

interface Group {
    id: number;
    name: string;
    created_by: number;
}

export interface GroupNavProps {
    onGroupSelect: (groupId: string) => void;
}

export default function GroupNavbar({ onGroupSelect }: GroupNavProps) {
    const router = useRouter()
    const [groups, setGroups] = useState<Group[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [activeGroup, setActiveGroup] = useState<number | null>(null)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                // Keep using mygroups endpoint
                const response = await api.get<ApiResponse<Group[]>>('/group/mygroups')
                if (response.data.success) {
                    setGroups(response.data.payload)
                    
                    // Restore active group from localStorage if it exists
                    const savedGroupId = localStorage.getItem('activeGroupId')
                    if (savedGroupId) {
                        const groupExists = response.data.payload.some(
                            group => group.id === parseInt(savedGroupId)
                        )
                        if (groupExists) {
                            setActiveGroup(parseInt(savedGroupId))
                            onGroupSelect(savedGroupId)
                        }
                    }
                } else {
                    setError('Failed to load groups')
                }
            } catch (err) {
                console.error('Error fetching groups:', err)
                setError('Failed to load groups')
            } finally {
                setLoading(false)
            }
        }

        fetchGroups()
    }, [onGroupSelect])

    const handleGroupClick = (groupId: number): void => {
        setActiveGroup(groupId)
        onGroupSelect(groupId.toString())
        // Save selected group to localStorage
        localStorage.setItem('activeGroupId', groupId.toString())
        // Keep navigation to group page
        router.push(`/content/task-manager`)
    }

    const getGroupInitials = (groupName: string): string => {
        return groupName
            ? groupName.split(' ').map((word: string) => word[0]).join('').toUpperCase().substring(0, 2)
            : 'GP'
    }

    const getRandomColor = (name: string): string => {
        const colors = [
            'from-rose-200 to-rose-300',
            'from-sky-200 to-sky-300',
            'from-violet-200 to-violet-300',
            'from-lime-200 to-lime-300',
            'from-amber-200 to-amber-300',
            'from-teal-200 to-teal-300',
            'from-fuchsia-200 to-fuchsia-300'
        ]
        const hash = name.split('').reduce((acc: number, char: string) => char.charCodeAt(0) + acc, 0)
        return colors[hash % colors.length]
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 shadow-md py-3 px-6 rounded-xl mb-4"
        >
            <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <FiBook className="text-xl text-green-600" />
                    <h2 className="text-base font-medium text-gray-700">My Study Groups</h2>
                </div>
                
                <div className="flex items-center space-x-4">
                    {loading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <FiLoader className="text-green-600 text-lg" />
                        </motion.div>
                    ) : error ? (
                        <div className="text-sm text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                            {error}
                        </div>
                    ) : groups.length === 0 ? (
                        <div className="text-sm text-gray-500 flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <FiUsers size={16} />
                            <span>No groups yet</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            {groups.map(group => (
                                <motion.button
                                    key={group.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleGroupClick(group.id)}
                                    className={`
                                        relative w-10 h-10 rounded-xl flex items-center justify-center
                                        text-gray-700 text-sm font-medium shadow-sm
                                        bg-gradient-to-br ${getRandomColor(group.name)}
                                        hover:shadow-md transition-all duration-200
                                        hover:ring-2 ring-offset-2 ring-green-200
                                        ${activeGroup === group.id ? 'ring-2 ring-offset-2 ring-green-400' : ''}
                                    `}
                                    title={group.name}
                                >
                                    {getGroupInitials(group.name)}
                                    {activeGroup === group.id && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute -bottom-1 w-1.5 h-1.5 bg-green-500 rounded-full"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>

                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-lg"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center text-white shadow-sm">
                        <span className="text-sm font-medium">U</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Profile</span>
                </motion.div>
            </div>
        </motion.nav>
    )
}