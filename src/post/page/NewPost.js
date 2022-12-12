import React from 'react';
import Dropdown from '../../shared/components/FormElements/DropDown';

import Card from '../../shared/components/UIElement/Card';
import Button from '../../shared/components/FormElements/Button';
//import InputCard from '../components/InputCard';

const NewPost = (props) => {

    return <form className='post-form'>
        <Dropdown />
        <Button>+ 추가</Button>
        <Card>
        </Card>
    </form>
};

export default NewPost;