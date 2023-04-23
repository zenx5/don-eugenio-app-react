import { TextField, InputAdornment, Typography } from "@mui/material";

export default function InputView (props) {
    const { label, value } = props

    return <TextField
        InputProps={{
            startAdornment: <InputAdornment position="start">
                <Typography sx={styles.label}>{label}</Typography>
            </InputAdornment>,
        }}
        value={value}
    />
}

const styles = {
    label: {
        fontWeight:'bold',
        color:'#000'
    }
}