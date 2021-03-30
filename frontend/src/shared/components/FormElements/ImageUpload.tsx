import React from 'react';
import Button from './Button';
import './ImageUpload.css';

interface IImageUpload {
  id: string;
  center?: boolean;
  onInput?: (
    id: string,
    pickedFile: string,
    isValid: boolean
  ) => void;
  errorText?: string;
};

const ImageUpload = ({id, center, onInput, errorText}: IImageUpload) => {
  const [file, setFile] = React.useState<string>('');
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const filePickerRef = React.useRef(null);

  React.useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // @ts-expect-error
      setPreviewUrl(fileReader.result);
    };
     // @ts-expect-error
    fileReader.readAsDataURL(file);

  }, [file])

  const pickedHandler = React.useCallback((event) => {
    let pickedFile = '';
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput && onInput(id, pickedFile, fileIsValid);
  }, [onInput, id, isValid]);

  const pickImageHandler = React.useCallback(() => {
    // @ts-expect-error
    filePickerRef.current.click();
  }, []);

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        accept=".jpg,.png,.jpeg"
        style={{display: 'none'}}
        id={id}
        onChange={pickedHandler}
        type="file" />
        <div className={`image-upload ${center && 'center'}`}>
          <div className={"imagee-upload__preview"}>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <p>Please pick an image.</p>}
          </div>
          <Button
            onClick={pickImageHandler}
            type="button">
              PICK IMAGE
          </Button>
        </div>
        {!isValid && <p>{errorText}</p>}
    </div>
  );
}

export default ImageUpload;
