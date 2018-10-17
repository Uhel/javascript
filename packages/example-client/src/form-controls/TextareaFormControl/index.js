import { defaultProps } from 'recompose';
import TextareaInputControlBox from 'primitives/TextareaInputControlBox';
import TextareaAutosize from 'react-autosize-textarea';

const TextareaFormControl = defaultProps({ as: TextareaAutosize })(TextareaInputControlBox);

export default TextareaFormControl;
