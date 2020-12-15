import React from 'react';

import './profile-user-info.styles.scss';
import { UserSearchService } from '../../services/user-search-service';
import { stringify } from 'querystring';

class ProfileUserInfo extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            loading: true,
            username: '',
            email: '',
            name: '',
            phoneNumber: ''
        }
    }

    async componentDidMount()
    {
        //get username from the logged in user in storage
        const loggedInUser = localStorage.getItem("currentToken");
        if (loggedInUser) 
        {
          const foundUser = JSON.parse(loggedInUser);
          //loading data
          this.setState({loading: true});
          //get the results from the username seach
          await UserSearchService.usernameSearch(foundUser.username)
          .then(results =>
            {
                //console.log(results);
                //treat results
                if(results)
                {    
                    //save the user credentials in the local storage
                    localStorage.setItem('currentUser', JSON.stringify(results[0]));
                    //set the state
                    this.setState(
                    {
                        //results are returned as an array of user and then we can access the fields
                        loading: false,
                        username: results[0].username,
                        email: results[0].email,
                        name: results[0].name,
                        phoneNumber: results[0].phoneNumber
                    });
                }
            })
        }
    }

    //render the html data
    render()
    {
        //if the data has loaded
        if(!this.state.loading)
        {
            return(
                <div className='user-info'>

                    <div className='descriptor'>
                        <dt>Username:</dt>
                        <dt>Email:</dt>
                        <dt>Name:</dt>
                        <dt>Phone number:</dt>
                    </div>

                    <div className='infotext'>
                        <dt>{this.state.username}</dt> 
                        <dt>{this.state.email}</dt> 
                        <dt>{this.state.name}</dt> 
                        <dt>{this.state.phoneNumber}</dt> 
                    </div>
                </div>
            );
        }
        else
        {
            return (<div className = 'user-info'> {this.state.loading && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />} </div>);
        }
    }
}

export default ProfileUserInfo;