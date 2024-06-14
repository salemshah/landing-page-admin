import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import EditorToolbar, { formats, redoChange, undoChange } from './EditorToolbar';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';


const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily
  },
  '& .ql-editor': {
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900]
    }
  }
}));

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  simple: PropTypes.bool,
  sx: PropTypes.object
};

export default function Editor({
                                 id = 'minimal-quill',
                                 error,
                                 value,
                                 onChange,
                                 simple = false,
                                 helperText,
                                 sx,
                                 ...other
                               }) {

  const { isEdit, heroToEdit } = useSelector(state => state.hero);
  const { setFieldValue } = useFormikContext();
  const [content, setContent] = useState(null);
  const quillRef = useRef(null);
  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  useEffect(() => {
    if (isEdit) {
      setFieldValue('description', heroToEdit?.description);
      setContent(heroToEdit?.description);
    } else {
      setFieldValue('description', '');
      setContent(null);
    }

  }, [heroToEdit]);

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    clipboard: {
      matchVisual: false
    }
  };

  return (
    <div>
      <RootStyle
        sx={{
          borderRadius: '10px',
          border: (theme) => `solid 1px ${theme.palette.secondary.main}`,
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`
          }),
          ...sx
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          refs={quillRef}
          value={content || heroToEdit?.description}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </RootStyle>
      {helperText && helperText}
    </div>
  );
}
