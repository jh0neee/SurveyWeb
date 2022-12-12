import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './InputCard.css'

const InputCard = () => {
    return <form className='post-form'>
        <Input element="input" type="text" label="Title" />
    </form>
};

export default InputCard