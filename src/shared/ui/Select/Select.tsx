import { Select as MuiSelect } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
/* import style from './Select.module.scss' */


export const Select = () => {
    return (
        <MuiSelect defaultValue={10}>
            <Option value={10}>Ten</Option>
            <Option value={20}>Twenty</Option>
            <Option value={30}>Thirty</Option>
            <Option value={40}>Forty</Option>
            <Option value={50}>Fifty</Option>
        </MuiSelect>
    )
}