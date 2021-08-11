export default function FormField ({ name, label, type, value, min, handleChange }) {
  // const minVal = type === 'number' ? `min=${min}` : false
  return (
    <div className="flex flex-col mb-4">
      <label
        className="mb-2 font-bold text-lg text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="border py-2 px-3 text-grey-800"
        type={type ? type : 'text'}
        min={min}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  )
}