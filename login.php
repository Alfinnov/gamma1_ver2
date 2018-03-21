<?php
 if (isset($_REQUEST) && isset($_REQUEST['login']) && isset($_REQUEST['passw']))
 {
  if ($_REQUEST['login'] == 'demo' && $_REQUEST['passw'] == 'demo') {
    echo '{ok}'; 
    echo md5($_REQUEST['login'].'/'.$_REQUEST['passw']);
  }
   else { echo '{err}'; }
 } else { echo '{require}'; }
 
 
 if (isset($_GET['token']))
 {
  if ($_GET['token'] == md5('demo/demo')) { echo '{ok}'; }
 }
 
 exit;
?>