export default async function getBands()
{
    //fetch for bands and get a response
    const response1 = await fetch('http://localhost:9000/bands/');
    //get the status response
    const data = response1;

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
