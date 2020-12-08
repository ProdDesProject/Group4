

export const UserSearchService = 
{
    usernameSearch
};

async function usernameSearch(username)
{
    //Parameter for get method
    const requestOptions = 
    {
      method: 'GET',
      //headers: { 'Content-Type': 'application/json' },
    }

    //fetch response from search by username
    var url = new URL('http://localhost:9000/search/users/username/' + username)

    //alert(url);
    var searchUsernameResponse = await fetch(url, requestOptions)
    
    let user = 
    {
        userId: '',
        username: '',
        email: '',
        name: '',
        phoneNumber: '',
        usersToken: ''
    }

    if(searchUsernameResponse === undefined)
    {
        return undefined;
    }
    else
    {
        //get the status response
        const data = searchUsernameResponse.status;
                
        //returned object response as json
        //alert(JSON.stringify(searchUsernameResponse.json()));

        //alert(data);

        if (data === 404 || data === 500)
        {
            return undefined;
        }
        else
        {
            user = await searchUsernameResponse.json(); 
            return user;
        }
    }  
}