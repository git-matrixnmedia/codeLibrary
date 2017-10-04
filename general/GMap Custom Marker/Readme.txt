
Google Maps Multi Marker implementation
---------------------------------------
Please get the below steps to implement in anywhere as static or dynamic
=========================================================================

1. you must add the below scripts at </head> part of the HTML page
<script src="https://maps.googleapis.com/maps/api/js?callback=initialize&key=AIzaSyCywB5dTeM12SJIJ-Gkq8zczzFHEoZlVRw" async defer></script>
Please Note - make a Map API key from google console with your gmail id. [i.e. http://console.developers.google.com]

2.After addded above scripts please add below style for GMap to avoid conflicting with underlying style.
<style type="text/css">
  #map {
    width: 550px;
    height: 350px !important;
    text-align: center;
    border:3px dashed #000;
  }
  #map2 {
    height: 50%;
    width:750px;
  }
  .gm-style .gm-style-iw {
     font-size: 12px;
     font-weight: bold;
     color: #000;
     padding: 5px 10px;
     font-family: sans-serif;
     text-transform: uppercase;
  }
  .info_content p {
    color:#0000FF;
    font-weight: normal !important;
  }
</style>

3. Then add the map id div as below in page with your desire location. The id could be user defined.
<div id="map"></div>

4. After make a table with your choice from the attached index.html file.

5. At last but not least add callback initialize function mention in attached index.html file.


Please follow the above mention steps to add the GMap marker and use as mention it is.

Thanks and Regards,
Abhishek

