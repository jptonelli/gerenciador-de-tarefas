function Input(props) {
    return (
        <input
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md mb-4"
            {...props} // aplica os atributos como type, placeholder, onChange etc.
        />
    );
}

export default Input;
