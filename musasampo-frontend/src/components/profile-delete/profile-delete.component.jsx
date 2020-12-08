
import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import  {DeleteUserService} from '../../services/delete-user-service'
import {SignInServices} from '../../services/sign-in-service'

class DeleteButton extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    //handle the delete button click
    onClickHandler()
    {
        //call delete service, deletes from database
        DeleteUserService()
        .then(status =>
            {
                console.log(status)
                if(status.status === 204)
                {
                    //logout (delete from local storage) -> automatocally reroutes to login page
                    alert("Your account has been deleted!");
                    SignInServices.Signout();
                }
                else
                {
                    //delete method failed
                    alert("Error at deleting the user!");
                }
            })
    }

    render()
    {
        return (
            <CustomButton onClick = {this.onClickHandler}>Delete</CustomButton>
        );
    };
}

export default DeleteButton;