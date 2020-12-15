export default async function getBandsBandId(bandId)
{
    //fetch the band with this id
    //building the header
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    //Parameter for get method
    const requestOptions = 
    {
        method: 'GET',
        headers: myHeaders ,
    }

    //creating the fetch url
    const url = new URL('http://localhost:9000/search/bands/bandId/' + bandId);

    //calling the API get method
    var bandResponse = await fetch(url, requestOptions);
    //bandResponse = await bandResponse.json();

    return bandResponse;
};