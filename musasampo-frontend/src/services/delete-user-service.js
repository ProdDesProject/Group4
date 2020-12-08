

export async function DeleteUserService()
{
    //get the userId from the local storage
    var user = localStorage.getItem('currentUser');
    //check if user is in local storage
    if(user !== undefined)
    {
        //parsing the found JSON
        const foundUser = JSON.parse(user);
        //getting the userID
        const userId = foundUser[0].userId;

        console.log(foundUser[0].usersToken);

        //Parameter for delete method
        const requestOptions = 
        {
            method: 'DELETE',
            mode: 'cors',
            headers: 
            {
                'Authorization': `Bearer ${foundUser[0].usersToken}`
            }
        }

        //creating the fetch url
        const url = new URL('http://localhost:9000/users/delete/' + userId);

        //calling the API delete method
        var deleteResponse = await fetch(url, requestOptions);

        //return status
        return deleteResponse;
    }
    return ;
}