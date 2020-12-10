
export async function DeleteUserService()
{
    //get the userId from the local storage
    var user = localStorage.getItem('currentUser');
    //get the token from the local storage
    var token = localStorage.getItem('currentToken');
    //check if user is in local storage
    if(user !== undefined)
    {
        //parsing the found JSON
        const foundUser = JSON.parse(user);
        //getting the userID
        const userId = foundUser[0].userId;

        //parsing the found token JSON
        const foundToken = JSON.parse(token);
        
        //building the header
        var myHeaders = new Headers();
        myHeaders.append("Authorization",  "Bearer " + foundToken.token.token);

        //Parameter for delete method
        const requestOptions = 
        {
            method: 'DELETE',
            mode: 'cors',
            headers: myHeaders,
            redirect: 'follow'
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