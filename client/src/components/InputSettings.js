const InputSettings = ({ label, name, value, setState }) => {
  return [
    <label>
      <h2>{label}:</h2>
    </label>,
    <input
      name={name}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }}
    />,
  ];
};

export default InputSettings;
