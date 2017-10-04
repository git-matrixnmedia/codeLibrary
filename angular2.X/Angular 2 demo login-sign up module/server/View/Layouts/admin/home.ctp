<!DOCTYPE html>
<html lang="en">
<head>
    <?php echo $this->element('admin/head') ; ?>
    <?php echo $this->Html->script('common'); ?>

</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
	<?php echo $this->element('admin/header'); ?>
	<?php echo $this->element('admin/left_panel'); ?>
	<div class="wrapper main_container">
	<!-- Content Wrapper. Contains page content -->
		<?php echo $this->fetch('content') ; ?>
	</div>
	<!-- ./wrapper -->
	<?php echo $this->element('admin/footer'); ?>
</div>
</body>
</html>
