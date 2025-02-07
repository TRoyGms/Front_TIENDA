function InputField(props) {
    const handleChange = (e) => {
        if (props.validate) {
            if (props.validate(e.target.value)) {
                props.onChange(e);
            }
        } else {
            props.onChange(e);
        }
    };

    return (
        <div className="border-2 border-black m-0 h-fit w-fit rounded-lg">
            <input 
                type={props.type}
                placeholder={"   " + props.placeholder} 
                value={props.value} 
                onChange={handleChange} 
                className="input-class rounded-lg pl-2" 
            />
        </div>
    );
}

export default InputField;
