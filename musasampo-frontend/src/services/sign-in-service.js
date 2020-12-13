import { BehaviorSubject } from 'rxjs';
var base64 = require('base-64');

const currentTokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentToken')));

export const SignInServices =
{
    Signin,
    Signout,
    currentToken: currentTokenSubject.asObservable(),
    get currentTokenValue () {return currentTokenSubject.value; }
};

//User Signin in login. gets variables if all good and try login in
async function Signin(username2,password2)
{
    //Parameter for postmethod
    const requestOptions = 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username:username2,password:password2 })
    }

    //fetch for checkuser2 and get a response
    const checkUserResponse = await fetch('http://localhost:9000/users/checkuser/',requestOptions)
    //get the status response
    const data = checkUserResponse.status;
    
    //returned object response
    var obj = 
    {
        result: false,
        token: '',
        username: ''
    };

    //alert(data);

    if (data === 404 || data === 400 || data === 500)
    {
        return obj;
    }
    else
    {
        //if response good, setting headers for login and saves token to variable 
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(username2 + ":" + password2));

        //fetch for login and response2 is token if all goes well
        var loginResponse = await fetch("http://localhost:9000/login", {method:'POST',headers: headers,});
        //login succeeded
        if(loginResponse)
        {
            //object for result and token to sign-in.component
            obj = 
            {
                result: true,
                token: await loginResponse.json(),
                username: username2
            };

             //send user credentials to localStorage
             localStorage.setItem('currentToken', JSON.stringify(obj));
             currentTokenSubject.next(obj.token);
        }
        return obj;  
    }
};

//removes token from local storage
function Signout()
{
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    currentTokenSubject.next(null); 
    window.location.reload(false);
}