//User Signup in login. Gets variables for creating new user

export async function Signup(username,email,name,phoneNumber,password)
{
  var object = 
  {
    "username": username, 
    "password": password,
    "name": name, 
    "email": email, 
    "phoneNumber": phoneNumber,
  };

  //Parameter for postmethod
  const requestOptions = 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object)
  }

  //fetch for creating a new user and it sends response back if succeeded or not
  const response =  await fetch('http://localhost:9000/users/createuser',requestOptions)
  const data2 = response.status;

  //alert(data2);

  var obj = 
  {
    result: false
  };

  if(data2 === 201)
  {
     obj.result = true;
  }

  //returns if all goes well to sign-up.component.jsx
  return obj;
}