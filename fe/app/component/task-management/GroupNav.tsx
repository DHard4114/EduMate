// Untuk nampilin group di top bar. Pakai API nanti, jangan axios
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function GroupNavbar() {
    const router = useRouter()
    
    // Data dummy grup pengguna
    const dummyGroups = [
        { id: '1', name: 'Tim Proyek' },
        { id: '2', name: 'Proyek Website' },
        { id: '3', name: 'B l a' },
        { id: '4', name: 'Study Club' },
        { id: '5', name: 'Hobby' }
    ]

    const handleGroupClick = (groupId) => {
        // Ini logikanya ganti ke : Group = Group yang dipilih. Jadi isi Task bakal nyesuaiin group
        router.push(`/group/${groupId}`)
    }

    // Fungsi untuk mendapatkan inisial grup
    const getGroupInitials = (groupName) => {
        return groupName 
            ? groupName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)
            : 'GP'
    }

    // Fungsi untuk menghasilkan warna acak berdasarkan nama grup
    const getRandomColor = (name) => {
        const colors = [
            'bg-green', 'bg-bluetime', 'bg-orangedark', 
            'bg-fontgreen', 'bg-greenbase', 'bg-pinkbase',
            'bg-time', 'bg-orangebase', 'bg-pinkdark'
        ]
        const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0)
        return colors[hash % colors.length]
    }

    return (
        <nav className="bg-white shadow-md py-3 px-6 flex items-center justify-between">

            {/* Grup lingkaran */}
            <div className="flex items-center space-x-4">
                {dummyGroups.map(group => (
                    <button
                        key={group.id}
                        onClick={() => handleGroupClick(group.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold 
                            ${getRandomColor(group.name)} hover:opacity-80 transition-opacity cursor-pointer`}
                        title={group.name}
                    >
                        {getGroupInitials(group.name)}
                    </button>
                ))}
            </div>

            {/* Siapa tau mau nambahin delete user */}
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-700 font-bold">U</span>
                </div>
            </div>
        </nav>
    )
}