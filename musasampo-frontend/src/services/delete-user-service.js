
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
        console.log(foundUser.userId);
        const userId = foundUser.userId;

        //parsing the found token JSON
        const foundToken = JSON.parse(token);
        
        //building the header
        var myHeaders = new Headers();
        myHeaders.append("Authorization",  "Bearer " + foundToken.token.token);

        //Parameter for the put method
        const requestOptions = 
        {
            method: 'PUT',
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