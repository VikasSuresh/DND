import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles(() => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
    },
}));

export default function DateAndTimePickers(props:any) {
    const [text, setText] = useState('');
    const classes = useStyles();

    let defaultDate = moment(new Date()).endOf('D').format();
    defaultDate = defaultDate.slice(0, defaultDate.lastIndexOf('+'));

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                type="datetime-local"
                defaultValue={defaultDate.slice(0, defaultDate.lastIndexOf(':'))}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onBlur={(e) => props.submit(e.target.value)}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && props.submit(text)}
                inputProps={{ style: { textAlign: 'center' } }}
            />
        </form>
    );
}
