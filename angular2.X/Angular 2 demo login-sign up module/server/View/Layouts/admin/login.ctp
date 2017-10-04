<!DOCTYPE html>
<html>
<head>
  <?php echo $this->element('admin/head') ; ?>
  <?php 
  echo $this->Html->css(array('plugins/iCheck/square/blue'));
  ?>
  <?php echo $this->Html->script(array('plugins/jQuery/jquery-2.2.3.min','bootstrap/js/bootstrap.min','plugins/iCheck/icheck.min','validator/jquery.validationEngine','validator/jquery.validationEngine-en'));?>
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="javascript:void(0);"><img src="<?php echo $this->webroot; ?>img/logo.png"/></a>
  </div>
  <?php echo $this->fetch('content');?>
</div>
<!-- /.login-box -->
                                                                                                                                                                                                      
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</body>
</html>
