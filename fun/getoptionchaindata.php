<?php 

function getOptionChainData(){
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://www.mcxindia.com/backpage.aspx/GetOptionChain',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
        "Commodity":"CRUDEOIL",
        "Expiry":"26JUL2023"
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Cookie: ASP.NET_SessionId=lm3wiinlmobaeh0zn1kaabdw'
    ),
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

echo getOptionChainData();

?>