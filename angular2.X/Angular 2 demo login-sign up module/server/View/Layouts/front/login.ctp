<!DOCTYPE html>
<html lang="en">
<head>
<?php echo $this->element('front/head'); ?>
</head>


<body>
<div id="large-header" class="large-header">
  <canvas id="demo-canvas"></canvas>
</div>
<svg version="1.1" id="triagnleSvg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"                                    xml:space="preserve" >
<clipPath id="polygon-clip-hexagon" clipPathUnits="objectBoundingBox">
  <polygon  points="0 0,1 1,-1 1,0 "/>
</clipPath>
<clipPath id="polygon-clip-two" clipPathUnits="objectBoundingBox">
  <polygon points="0 0,9 -1,10 10,1"/>
</clipPath>
<!-- Top -->
<rect class="shape-top" clip-path="url(#polygon-clip-hexagon)" preserveAspectRatio="none" width="100%" height="100%" xlink:href="" style="fill: #1b9d62"/>
<!-- Bottom -->
<rect class="shape-bottom" clip-path="url(#polygon-clip-two)" preserveAspectRatio="none" width="100%" height="100%" xlink:href="" style="fill: #54a2d6"/>
</svg>

<div class="login-container">
	<?php echo $this->element('front/header'); ?>

	<div class="container logo-box">
    	<p><a href="javascript:void(0);"><img src="<?php echo $this->webroot; ?>img/logo.png" alt="" title="Image App"></a></p>
  	</div>
  	<div class="container login-heading">
    	<h1>Increase your social media engagement</h1>
    	<h3>With Image app, you can create beautiful images easily to make your posts pop</h3>
  	</div>
  	  <div class="container">
            <?php echo $this->fetch('content');?>
      </div>
    </div>

<?php echo $this->element('front/footer');?>
<script>
  $(function () {
    /*$('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });*/
  });
</script>
</body>
</html>