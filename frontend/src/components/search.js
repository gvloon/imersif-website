import React, {Component} from 'react'
import {TextField, InputAdornment} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'

const Input = params => {
    const props = Object.assign(params.InputProps, {
        endAdornment: (
            <InputAdornment position="end">
                <SearchIcon  color="disabled"  />
            </InputAdornment>
        ),
        style: {
            paddingRight: '10px'
        }
    })
    return (
        <TextField {...params} InputProps={props} variant="outlined" />
    )
}

export default ({options, label, onChange}) => (
    <Autocomplete
        options={options}
        filterOptions={options => options}
        getOptionSelected={() => false}
        style={{ width: '100%', maxWidth: 600 }}
        renderInput={params => <Input {...params} label={label} onChange={onChange} />}
    />
)
