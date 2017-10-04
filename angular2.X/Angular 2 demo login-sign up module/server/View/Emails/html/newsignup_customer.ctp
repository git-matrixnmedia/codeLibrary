<table width="600" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="middle" style="background:rgb(56, 142, 60); padding:10px 0; margin:0; line-height:0;"><img src="<?php echo Router::url('/',true);?>img/logo.png" alt=""/></td>
  </tr>
  <tr>
    <td style="font-family:Arial, Helvetica, sans-serif; font-size:12px; padding:20px; margin:0;">
    <div style="padding-bottom:20px; font-weight:700;">Dear <?php echo $customerData[0]['fullname']; ?>,</div>
 
   <p>Congratulation !!! You have successfully registered in ImageApp site</p>
   <p>Please <a href="<?php echo $customerData[0]['siteURL']; ?>" target="_blank">login</a> to continue</p>
   
    <div style="padding-top:20px; font-weight:700;">
    Sincerely, <br/>
    My Site
    </div>

    </td>
  </tr>
  <tr>
    <td align="center" valign="middle" style="background:#e5eae4; font-family:Arial, Helvetica, sans-serif; font-size:12px; padding:20px 0; margin:0; line-height:0;" > Copyright <?php echo date('Y'); ?> All rights reserved. </td>
  </tr>
</table>

