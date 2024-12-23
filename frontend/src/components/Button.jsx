export function Button({ label, onClick }) {
    return <div>
        <button type="button" onClick={onClick} 
        className="w-full border-solid border-2 border-black-600 bg-white-500 text-gray-500 font-bold rounded-lg px-4 my-2">
            {label}
        </button>
    </div>
}