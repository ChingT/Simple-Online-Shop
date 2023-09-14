export default function FormInput(name, value, handleChange, type = "text") {
  return (
    <input
      type={type}
      name={name}
      placeholder={name}
      value={value}
      onChange={handleChange}
      required
    />
  );
}
