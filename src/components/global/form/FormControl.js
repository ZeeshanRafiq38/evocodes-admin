import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker'
import PasswordInput from './PasswordInput'
import FormikFileInput from './FormikFileInput'
import MultiFileInput from './MultiFileInput'
import ToggleButton from './ToggleButton'
import OtpInputField from './OtpInputField'
import TagsInput from './TagsInput'
import MetaTagsInput from './MetaTagsInput'


function FormControl (props) {
    const { control, ...rest } = props;
    
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'otp':
            return <OtpInputField {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <RadioButtons {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        case 'password':
            return <PasswordInput {...rest} />
        case 'file':
            return <FormikFileInput {...rest} />
        case 'multi-file':
            return <MultiFileInput {...rest} />
        case 'toggle':
            return <ToggleButton {...rest} />
        case 'tags':
            return <TagsInput {...rest} />
        case 'meta':
            return <MetaTagsInput {...rest} />
        default:
            return null
    }
}

export default FormControl;
