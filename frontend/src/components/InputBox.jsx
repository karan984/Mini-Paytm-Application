export function InputBox({label, placeholder, onChange}){
    return <div>
        <div
        className="text-sm font-medium text-left py-2 text-gray-600">
            {label}
        </div>
        <input type="text" placeholder={placeholder} onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}