import React from "react"
import PropTypes from "prop-types"


const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    type: PropTypes.oneOf(["radio", "checkbox"])
}


const defaultProps ={
    checked: false,
    type: "checkbox"
}


const Checkbox = ({
    checked,
    type,
    name,
    value,
    onChange = _ => {}
    }) => (
        <div>
            <input
                {...{
                    type,
                    name,
                    onChange,
                    value
                }}
                defaultChecked={checked}
            />
            {value}
        </div>
    )


Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps


export default Checkbox