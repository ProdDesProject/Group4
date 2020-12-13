//fetch bands from backend
export async function createband(data)
{
    var FormData = data;

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(FormData)
      }
    //fetch for checkuser2 and get a response
    const response = await fetch('http://localhost:9000/bands/createband/:userId',requestOptions);
    //get the status response
    //const data2 = await response.json();
    const data = response;

    //alert(data);

    if (data === 404 || data === 400 || data === 500)
    {
       alert("Error");
    }
    else
    {
        return data;  
    }

};
