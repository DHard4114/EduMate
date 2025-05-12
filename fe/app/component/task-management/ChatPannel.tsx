export default function ChatPanel() {
    return (
        <div className="w-1/4 bg-green-100 dark:bg-green-900 p-4 rounded-lg overflow-y-auto">
        <h2 className="font-bold text-lg mb-2 dark:text-white">Discussion</h2>
        {[1, 2, 3].map((msg, idx) => (
            <div key={idx} className="mb-3">
            <div className="text-sm font-bold dark:text-gray-200">Sender - 00:15</div>
            <div className="text-sm dark:text-gray-300">Hey, how come we’re still this going by...</div>
            </div>
        ))}
        </div>
    );
}