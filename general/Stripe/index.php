<html>
<head>
<title>Stripe Payment</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
</head>
<body>
<?php
require_once('library/init.php');
\Stripe\Stripe::setApiKey('sk_test_nSiCm1h74LcfkkTkKPkyr3Fi');
$months = array('01'=>'January','02'=>'February','03'=>'March','04'=>'April','05'=>'May','06'=>'June','07'=>'July','08'=>'August','09'=>'September','10'=>'October','11'=>'November','12'=>'December');
$years = range(date('Y'),date('Y')+100);
$error ="";
$error_flag=0;
$charge="";
$chargeArray=array();

	if(isset($_POST['payment'])&& $_POST['payment']=="Pay Now")
	{
		if( $_POST["amount"]!="" &&$_POST["card_no"]!="" &&$_POST["cvv_no"]!="")
		{
			$amount=$_POST["amount"];
			$card_no=$_POST["card_no"];
			$expiry_month=$_POST["expiry_month"];
			$expiry_year=$_POST["expiry_year"];
			$cvv_no=$_POST["cvv_no"];
			
			$amount = round($amount,2);
			$amount_cent = $amount*100;
			try{
				$myCard = array('number' => $card_no, 'exp_month' =>$expiry_month, 'exp_year' =>$expiry_year, 'cvc'=>$cvv_no);
				
				$charge = \Stripe\Charge::create(array('card' => $myCard, 'amount' =>$amount_cent, 'currency' => 'usd'));
				
				$chargeJson=substr($charge,19);
				$chargeArray=json_decode($chargeJson,true);
				
				echo "<h5 style='color:green;margin:0px;padding:0px;'>*Payment succesful.please check the responses</h5>";
			}catch(Stripe_CardError $e){
				//Card Errors
				$error_flag++;
				$error = $e->getMessage();
			} catch (Stripe_InvalidRequestError $e) {
				// Invalid parameters were supplied to Stripe's API
				$error_flag++;
				$error = $e->getMessage();
			} catch (Stripe_AuthenticationError $e) {
				// Authentication with Stripe's API failed
				$error_flag++;
				$error = $e->getMessage();
			} catch (Stripe_ApiConnectionError $e) {
				// Network communication with Stripe failed
				$error_flag++;
				$error = $e->getMessage();
			} catch (Stripe_Error $e) {
				// Display a very generic error to the user, and maybe send
				// yourself an email
				$error_flag++;
				$error = $e->getMessage();
			} catch (Exception $e) {
				// Something else happened, completely unrelated to Stripe
				$error_flag++;
				$error = $e->getMessage();
			}
			
			if($error_flag>0)
				echo "<h3>Please enter the following details</h3><br/><h5 style='color:red;margin:0px;padding:0px;'>*Error!".$error."</h5>";
		}
		else
		{
			echo "<h3>Please enter the following details</h3><br/><h5 style='color:red;margin:0px;padding:0px;'>*Please fill up all the fields</h5>";
		}
	}
	else
	{
		echo "<h3>Please enter the following details</h3>";
	}
?>
<form method="post">
		<table border="1px">
			<tr>
				<td>
					Amount($)
				</td>
				<td>
					<input type="number" name="amount" min="1" autocomplete="off" style="width:100%;">
				</td>
			</tr>
			<tr>
				<td>
					Card No
				</td>
				<td>
					<input type="text" name="card_no" autocomplete="off" style="width:100%;">
				</td>
			</tr>
			<tr>
				<td>
					Card Expiry Month
				</td>
				<td>
					<select name="expiry_month" style="width:100%;">
						<?php
							foreach($months as $mkey=>$mval)
							{
						?>
							<option value="<?php echo $mkey;?>"><?php echo $mval;?></option>
						<?php
							}
						?>
					
					</select>
				</td>
			</tr>
			<tr>
				<td>
					Card Expiry Year
				</td>
				<td>
					<select name="expiry_year" style="width:100%;">
						<?php
							foreach($years as $yval)
							{
						?>
							<option value="<?php echo $yval;?>"><?php echo $yval;?></option>
						<?php
							}
						?>
					
					</select>
				</td>
			</tr>
			<tr>
				<td>
					CVV No.
				</td>
				<td>
					<input type="password" name="cvv_no" style="width:100%;">
				</td>
			</tr>	
			<tr class="show_response">
				<td colspan="2">
					<textarea id="json_response" style="width:100%;" rows="8" cols="50" placeholder="JSON Response"><?php echo $charge;?></textarea>
				</td>
			</tr>
			<tr class="show_response">
				<td colspan="2">
					<textarea id="array_response" style="width:100%;" rows="8" cols="50"placeholder="Array Response"><?php
					if(!empty($chargeArray))
							print_r($chargeArray);
					?></textarea>
				</td>
			</tr>
			<tr>
				<td align="right">
					 <input type="submit" name="payment" value="Pay Now">
				</td>
				<td align="left">
					 <input type="reset" name="reset" value="Reset">
				</td>
			</tr>
</form>
</body>
</html>