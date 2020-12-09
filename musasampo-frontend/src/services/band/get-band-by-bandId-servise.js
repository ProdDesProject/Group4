export default async function getBandsBandId(bandId)
{
    //fetch for bands and get a response
    const response1 = await fetch('http://localhost:9000/bands/'+bandId);
    //get the status response
    const data = await response1.json();

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