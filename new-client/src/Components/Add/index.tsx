import React, { Component } from 'react';

class Add extends Component<any, any> {
    private myRef:any;

    constructor(props:any) {
        super(props);
        this.state = {
            data: '',
        };
        this.myRef = React.createRef();
    }

    change = (e:any) => {
        this.setState((state:any) => ({
            ...state,
            data: e.target.value,
        }));
    };

    action = (e:any) => {
        if (e.key === 'Enter' || e.type === 'click') {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.addToDo(this.state.data);
            this.myRef.current.value = '';
            this.setState((state:any) => ({
                ...state,
                data: null,
            }));
        }
    };

    render() {
        return (
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a Task"
                    ref={this.myRef}
                    onKeyDown={this.action}
                    onChange={this.change}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.action}>Add</button>
                </div>
            </div>
        );
    }
}

export default Add;
