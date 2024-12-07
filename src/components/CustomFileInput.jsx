import React, { useState } from 'react';

const CustomFileInput = (props) => {
  const { className, style, ...rest } = props;
  const [fileName, setFileName] = useState('Choose File');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : 'Choose File');
    props.onChange(event);
  };

  return (
    <div className={`custom-file-input ${className}`} style={style}>
      <label htmlFor="file-input">
        {fileName}
      </label>
      <input
        id="file-input"
        type="file"
        {...rest}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CustomFileInput;