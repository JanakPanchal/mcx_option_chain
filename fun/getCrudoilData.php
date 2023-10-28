<?php 

$jsonFile = 'data.json';

// Read the contents of the JSON file
$jsonData = file_get_contents($jsonFile);

// Decode the JSON data into a PHP associative array
$data = $jsonData;

function getOptionChainData(){
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://www.mcxindia.com/backpage.aspx/GetCommoditywiseBhavCopy',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
        "Symbol": "CRUDEOIL",
        "Expiry": "16JUN2023",
        "FromDate": "20230518",
        "ToDate": "20230528",
        "InstrumentName": "FUTCOM"
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Cookie: ASP.NET_SessionId=5uqvka0cs0iqysksczkiyoqu'
    ),
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

echo $data;

?>