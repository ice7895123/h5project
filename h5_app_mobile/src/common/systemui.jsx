import React, {Component} from 'react';
import $ from 'underscore';

const isNomber = (number) => {
    if (isEmpty(number)) {
        return true;
    }
    let reg = /^[0-9]*]*$/;
    if (reg.exec(number)) {
        return true;
    }
    return false;
}

const isEmpty = (value) => {
    if (typeof value === "undefined" || value === '' || value == null) {
        return true;
    } else {
        return false;
    }
}

class Input extends Component {

    handleChangeValue = (e) => {
        this.props.onChange(e.target.value);
    }

    render() {
        const style = this.props.dot ?
            {width: '96%', height: '40px', float: 'right', padding: '0px 5px'} :
            {width: '100%', height: '40px', float: 'right', padding: '0px 5px'};
        const spandot = this.props.dot ? <span style={{color: 'red'}}>*</span> : null;
        return (
            <div className='am-modal-input' style={$.extend({borderTop: 'none'})}>
                <label style={{lineHeight: '40px'}}>
                    {spandot}
                    <input
                        style={$.extend({...style}, {...this.props.style})}
                        type={this.props.type || 'text'}
                        onChange={this.handleChangeValue}
                        maxLength={this.props.maxLength}
                        value={this.props.value || ''}
                        placeholder={this.props.placeholder || ''}
                    />
                </label>
            </div>)
    }
}

class InputNumber extends Component {

    handleChangeValue = (e) => {
        const no = e.target.value;
        this.props.onChange(isNomber(no) ? no : this.props.value);
    }

    render() {
        const value = this.props.value || '';
        const style = this.props.dot ?
            {width: '96%', height: '40px', float: 'right', padding: '0px 5px'} :
            {width: '100%', height: '40px', padding: '0px 5px'}
        const spandot = this.props.dot ? <span style={{color: 'red'}}>*</span> : null;
        const afterField = this.props.afterField;
        return (
            <div className='am-modal-input' style={$.extend({borderTop: 'none'})}>
                <label style={{lineHeight: '40px'}}>
                    {spandot}
                    {afterField}
                    <input
                        style={$.extend({...style}, {...this.props.style})}
                        type={this.props.type || 'text'}
                        onChange={this.handleChangeValue}
                        maxLength={this.props.maxLength}
                        value={value}
                        placeholder={this.props.placeholder || ''}
                    />
                </label>
            </div>)
    }
}

export {Input, InputNumber}
