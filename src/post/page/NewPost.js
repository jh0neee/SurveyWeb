import React from 'react';

import Dropdown from '../../shared/components/FormElements/DropDown';
import Button from '../../shared/components/FormElements/Button';
import InputCard from '../components/InputCard';

const NewPost = (props) => {

    return <React.Fragment>
        <Dropdown />
        <Button>+ 추가</Button>
        <InputCard />
    </React.Fragment>
};

export default NewPost;