import { defaultProps } from 'recompose';
import TextInputControlBox from 'primitives/TextInputControlBox';

const InputFormControl = defaultProps({ as: 'input', type: 'text' })(TextInputControlBox);

export default InputFormControl;
