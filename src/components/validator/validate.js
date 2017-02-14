/**
 * Created by leixianhua on 17/2/13.
 */
import React from 'react'
import {rules} from 'react-validation/lib/build/validation.rc'
// From v2.10.0
// import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc'
import validator from 'validator';
Object.assign(rules, {
    // Key name maps the rule
    required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: value => {
            return value.toString().trim();
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    // Key name maps the rule
    url: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: value => {
            return validator.isURL(value.toString().trim());
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: value => {
            return <span className='form-error is-visible'>地址不正确</span>
        }
    },
});
export default rules;