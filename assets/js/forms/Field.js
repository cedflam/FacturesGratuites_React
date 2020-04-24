import React from 'react';

const Field = ({name, label, value, onChange, placeholder, type = "text", error=""}) => {
    return (
        <div className="form-group">
            <label  htmlFor={name}>{label}</label>
            <input type={type}
                   value={value}
                   name={name}
                   onChange={onChange}
                   placeholder={placeholder}
                   className={"form-control" + ( error && " is-invalid") }
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default Field;