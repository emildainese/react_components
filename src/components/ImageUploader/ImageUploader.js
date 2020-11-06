import React, { Fragment, useState, useEffect } from 'react';
import DropZone from './DropZone';
import classes from './DropZone.module.scss';

const ImageUploader = (props) => {
  const fileInputRef = React.useRef();
  const [state, setState] = useState({ dragging: false, file: null });
  const [img, setImage] = useState({ id: '', src: '' });

  const overrideDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragEnterHandler = (e) => {
    overrideDefault(e);
    if (e.dataTransfer.types && e.dataTransfer.types[0] === 'Files') {
      setState({ ...state, dragging: true });
    }
  };

  const dragLeaveHandler = (e) => {
    overrideDefault(e);
    setState({ ...state, dragging: false });
  };

  const dropHandler = (e) => {
    overrideDefault(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setState({ ...state, file: e.dataTransfer.files[0] });
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) return;
      const image = new Image();
      image.file = file;
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImage({ id: Math.random(), src: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    setState({ ...state, dragging: false });
    setImage({ id: '', src: '' });
  };

  const onSelectFileClick = () => {
    fileInputRef && fileInputRef.current.click();
  };

  const onFileChanged = (e) => {
    if (e.target.files && e.target.files[0]) {
      setState({ ...state, file: e.target.files[0] });
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      const image = new Image();
      image.file = file;
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImage({ id: Math.random(), src: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    setState({ ...state, dragging: false });
    setImage({ id: '', src: '' });
  };

  useEffect(() => {
    window.addEventListener('dragover', overrideDefault);
    window.addEventListener('drop', overrideDefault);
    return () => {
      window.removeEventListener('dragover', overrideDefault);
      window.removeEventListener('drop', overrideDefault);
    };
  }, []);

  const dragOverHandler = (e) => {
    overrideDefault(e);
    e.dataTransfer.dropEffect = 'copy';
    setState({ ...state, dragging: true });
  };

  return (
    <Fragment>
      <DropZone
        dragging={state.dragging}
        file={state.file}
        onSelectFileClick={onSelectFileClick}
        onDrag={overrideDefault}
        onDragStart={overrideDefault}
        onDragEnd={overrideDefault}
        onDragOver={dragOverHandler}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
      >
        <input
          ref={fileInputRef}
          type="file"
          className={classes.FileInput}
          onChange={onFileChanged}
        />
      </DropZone>
      {props.preview && (
        <div className={classes.Preview}>
          <span style={{ marginBottom: `${img.src !== '' ? '1rem' : 0}` }}>
            Image Preview
          </span>
          {img.src !== '' && (
            <img
              width={props.width ? props.width : '50%'}
              height={props.height ? props.height : '50%'}
              src={img.src}
              alt="ImagePreview"
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ImageUploader;
