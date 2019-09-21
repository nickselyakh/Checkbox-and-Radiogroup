import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import { setDisplayName, 
         compose, 
         mapProps } from "recompose"
import queryString from "query-string"

import RadioGroup from "Components/RadioGroup"
import Checkbox from "Components/Checkbox"


const FILTER_URL = "filter"


const ConnectedRadioGroup = compose(
    setDisplayName("SetSizeAndColor"),

    // Yeah we could use react hooks instead...
    connect(
        ({ router: {
            location: {
                    search = ""
                }
            }
        }) => ({
            ...queryString.parse(search)
        }),
        _ => ({
            onChange: console.log
        })
    ),

    mapProps(({
        name,
        size,
        onChange,
        children
    }) => ({
        name,
        value: size,
        onChange,
        children
    }))
)(RadioGroup)


const ConnectedCheckbox = compose(
    connect(
        ({ form: { color }}, { value }) => ({
            checked: color.includes(value)
        }),
        _ => ({
            onChange: console.log
        })
    ),

    mapProps(({
        name,
        color,
        onChange,
        children
    }) => ({
        name,
        value: color,
        onChange,
        children
    }))
)(Checkbox)

export default _ =>
    <Route
        path={`/${FILTER_URL}`}
        render={props => (
            <Fragment>
              <ConnectedRadioGroup
                  name="size"
              >
                <Checkbox value="S"/>
                <Checkbox value="M"/>
                <Checkbox value="l"/>
                <Checkbox value="XL"/>
                <Checkbox value="XLL"/>
              </ConnectedRadioGroup>

              <ConnectedCheckbox name="color" value="1"/>
              <ConnectedCheckbox name="color" value="2"/>
              <ConnectedCheckbox name="color" value="3"/>
              <ConnectedCheckbox name="color" value="4"/>
              <ConnectedCheckbox name="color" value="5"/>

            </Fragment>
        )
    }
    />