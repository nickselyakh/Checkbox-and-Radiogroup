import React from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators as bind } from "redux"
import PropTypes from "prop-types"

import { setDisplayName,
         compose, 
         mapProps,
         withContext, 
         withStateHandlers,
         getContext,
         onlyUpdateForKeys} from "recompose"
import { pushColor } from "Actions"

import RadioGroup from "Components/RadioGroup"
import Checkbox from "Components/Checkbox"


const FILTER_URL = "filter"

// Yeah we could use react hooks instead...
const ConnectedRadioGroup = compose(
    getContext({
        updateSize: PropTypes.func,
        size: PropTypes.string
    }),

    onlyUpdateForKeys("size"),

    mapProps(({
        name,
        size,
        value,
        updateSize,
        children
    }) => ({
        name,
        value: size,
        checked: size === value,
        onChange: size => updateSize(size),
        children
    }))
)(RadioGroup)


const ConnectedForm = compose(
    setDisplayName("ConnectedForm"),

    connect(
        ({ form : { color, size }
        }) => ({
            color,
            size
        }),
        dispatch => ({
            onChange: bind(pushColor, dispatch)
        })
    ),

    withStateHandlers(({ color, size }) => ({ 
        color,
        size 
    }), {
        updateColor: ({ color, ...state }, { onChange }) => (value) => {
            const newState = {
                ...state,
                color: color.indexOf(value) > -1 ?
                    color.slice(0, color.indexOf(value)).concat(color.slice(color.indexOf(value) + 1))
                    : [...color, value]             
            }

            onChange(newState)

            return newState
        },
        updateSize: ({ size, ...state }, { onChange }) => (size) => {
            const newState = {
                ...state,
                size
            }

            onChange(newState)

            return newState
        }
    }),

    mapProps(({
        name,
        size,
        color,
        updateColor,
        updateSize,
        children
    }) => ({
        name,
        color,
        size,
        updateColor,
        updateSize,
        children
    })),

    withContext(
        {
            size: PropTypes.string,
            color: PropTypes.arrayOf(PropTypes.string),
            updateColor: PropTypes.func,
            updateSize: PropTypes.func
        },

        ({ color,
           size,
           updateColor,
           updateSize }) => {
            return {
            color,
            size,
            updateColor,
            updateSize
        }}
    )

)(props => <form>{props.children}</form>)


const ConnectedCheckbox = compose(
    getContext({
        color: PropTypes.arrayOf(PropTypes.string),
        updateColor: PropTypes.func
    }),

    onlyUpdateForKeys("color"),

    mapProps(({
        name,
        updateColor,
        children,
        value,
        color,
    }) => ({
        name,
        value,
        checked: color.indexOf(value) > -1,
        onChange: event => updateColor(event.target.value),
        children
    }))
)(Checkbox)


export default _ =>
    <Route
        path={`/${FILTER_URL}`}
        render={props => (
            <ConnectedForm>
              <ConnectedRadioGroup
                  name="size"
              >
                <Checkbox value="S"/>
                <Checkbox value="M"/>
                <Checkbox value="L"/>
                <Checkbox value="XL"/>
                <Checkbox value="XLL"/>
              </ConnectedRadioGroup>

              <ConnectedCheckbox name="color" value="1"/>
              <ConnectedCheckbox name="color" value="2"/>
              <ConnectedCheckbox name="color" value="3"/>
              <ConnectedCheckbox name="color" value="4"/>
              <ConnectedCheckbox name="color" value="5"/>

            </ConnectedForm>
        )
    }
    />