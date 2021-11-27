import React, { useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import moment from 'moment';

export default function FormDialog({ handleClose, task, Store }:any) {
    const [taskName, setTaskName] = useState('');
    const submit = () => {
        if (task.id) {
            Store.updateOne({ _id: task.id, name: taskName });
        } else if (taskName && task.start && task.dueDate) {
            Store.addToDo({
                name: taskName,
                start: moment(task.start).format(),
                dueDate: moment(task.dueDate).subtract(1).endOf('d').format(),
            });
        }
    };

    return (
        <div>
            <Dialog open={task.open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Add a task for the selected timeline, Please enter the Task Name!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e:any) => setTaskName(e.target.value)}
                        label="Task Name"
                        fullWidth
                        variant="standard"
                        defaultValue={task.name}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { submit(); handleClose(); }}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
