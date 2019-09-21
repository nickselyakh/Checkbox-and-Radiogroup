import React, {
    Fragment } from "react"
import PropTypes from "prop-types"


const propTypes = {
    name: PropTypes.string.isRequired,
}

class RadioGroup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }
    }

    shouldComponentUpdate({ value }, { value: nextValue}) {
        return this.state !== value || this.state !== nextValue
    }

    _handleChange = event => {
        console.log(event.target.value)
    }

    render() {
        console.log(this.state)
        return (
        <Fragment>
            { React.Children.map(this.props.children, child => {
                const { value } = child.props

                return React.cloneElement(child, {
                    type: "radio",
                    name: this.props.name,
                    value,
                    checked: value === this.state.value,
                    onChange: this._handleChange
                })
            })}
       </Fragment>)
    }
}


RadioGroup.propTypes = propTypes

export default RadioGroup