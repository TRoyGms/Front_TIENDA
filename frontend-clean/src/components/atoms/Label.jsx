function Label(props) {
    return (
        <div className="no-underline select-none">
            <p className="text-center font-black p-2 mr-6">{props.text}</p>
        </div>
    );
}

export default Label;
