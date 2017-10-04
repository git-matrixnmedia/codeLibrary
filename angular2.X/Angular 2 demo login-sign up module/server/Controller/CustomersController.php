<?php
App::uses('CakeEmail', 'Network/Email');

class CustomersController extends AppController
{
	public $components = array('Paginator','RequestHandler');
	public $uses = array('Customer');
	public $frontURL;
	
	function beforeFilter()
	{
		parent::beforeFilter() ;
		$this->frontURL = Configure::read('front_site_url');
	}
	

	// Customer Sign Up for front-end
	function signupCustomer()
	{
		$this->autoRender = false;

		if($this->request->is('Post'))
		{
			$this->Customer->set($this->request->data);
			$response = array();
			$checkPassword = $this->Auth->password($this->request->data['password']);
			$emailID = $this->request->data['email_id'];
			$this->request->data['Customer']['password'] = $checkPassword;
			$this->request->data['Customer']['email_id']=$this->request->data['email_id'];
			$this->request->data['Customer']['fullname'] = $this->request->data['name'];
			$this->request->data['Customer']['created_on']= date("Y-m-d H:i:s");

				$existing_email_count = $this->Customer->find('count',array('conditions'=>array('email_id'=>$this->request->data['Customer']['email_id']))); 
				if($existing_email_count == 0)
				{				
						$customerInformation = array($this->request->data['Customer']);
						$customerInformation[0]['email_id'] = $emailID; 
						$customerInformation[0]['siteURL'] = $this->frontURL;
						if($this->Customer->saveAll($this->request->data['Customer']))
						{
							//Send mail to user and admin after registration
							$this->sendNewSignUpMailAdmin($customerInformation);
							$this->sendNewSignUpMailCustomer($customerInformation);

					   		echo json_encode(array('isSignUp'=>1,'message' =>'Success ! You have signed up successfully. Log In to continue!!')); 
						}	            
			            else
			            {
							echo json_encode(array('isSignUp'=>0,'message' =>'Error! Unable to add new customer. Please try again')); 
			            }

	        	}
	        	else
	        	{
	        		echo json_encode(array('isSignUp'=>0,'message' =>'Error! Email ID already exists. Please try to sign up with different Email ID.')); 
	        	}
		}
	}


	// Customer Login for Front End
	function loginCustomer()
	{
		$this->autoRender = false;


		if($this->request->is('Post'))
		{
			$checkUser = $this->Customer->find('all',array('conditions'=>array('email_id'=>$this->request->data['email_id'])));

			if(!empty($checkUser))
			{
				
				$checkPassword = $this->Auth->password($this->request->data['password']);
				if($checkUser[0]['Customer']['password'] == $checkPassword)
				{

							if(isset($this->request->data['remember_me_customer']))
							{
								if($this->request->data['remember_me_customer'])
								{
								   $cookieTime = "12 months";
								   $this->Cookie->write('rememberMeCustomer', $this->request->data, true, $cookieTime);  
								}
								else
									$this->Cookie->delete('rememberMeCustomer');
							}
							else
							{
								$this->Cookie->delete('rememberMeCustomer');
							}
							$checkUser[0]['Customer']['login_via'] = 'general' ;
						

							//print_r($checkUser);
							$this->Session->write('customerInfo', $checkUser);
							echo json_encode(array('isloggedin'=>1,'customerInfo' => $this->Session->read('customerInfo')));
				}
				else
				{
					echo json_encode(array('isloggedin'=>0,'customerInfo' =>'Error ! Invalid password '));
				}
			}
			else
			{
				echo json_encode(array('isloggedin'=>0,'customerInfo' =>'Error !Invalid Email address '));
			}
		}
	}



	// Saving data after Social sign up for Front End
	function socialSignUp()
	{
		$this->autoRender = false;


		$is_loggedin = 'N' ;
		$check_user = $this->Customer->find('first',array('recursive' => 0,'conditions' => array('email_id' => $this->request->data['email_id']	)));
		//print_r($check_user);
		if($this->request->data['provider'] == 'google')
		{
			$facebookID = '';
			$googleID = $this->request->data['uid'];
		}
		else if($this->request->data['provider'] == 'facebook')
		{
			$facebookID = $this->request->data['uid'];
			$googleID = '';
		}

		if(count($check_user) == 0)
		{
			$user_data = array() ;

				
				$user_data['Customer'] = array(
										'fullname'  => $this->request->data['name'],
										'created_on'=>date("Y-m-d H:i:s"),
										'facebookID'  => $facebookID,
										'googleID'	 => $googleID,
										'email_id'    => $this->request->data['email_id']
											); 
				
				$this->Customer->saveAll($user_data);
				$is_loggedin = 'Y' ;
				

				// Send Email to Customer and Admin
				$customerInformation = array();

				$customerInformation[0]['fullname'] = $this->request->data['name']; 
				$customerInformation[0]['email_id'] = $user_data['Customer']['email_id'];
				$customerInformation[0]['created_on'] = $user_data['Customer']['created_on'];
				$customerInformation[0]['siteURL'] = $this->frontURL;
					
				$this->sendNewSignUpMailAdmin($customerInformation);
				$this->sendNewSignUpMailCustomer($customerInformation);
		}
		else
		{
			//login
				
					$is_loggedin = 'Y' ;
					$this->Customer->save(array('id' => $check_user['Customer']['id'],'facebookID' => $facebookID,'googleID' => $googleID));
		}


		if($is_loggedin == 'Y')
			{
				//$check_user = $this->Customer->find('first',array('conditions' => array('email_id' => $user_id)));
				$customerSessionInfo[0]['Customer'] = array(
					 'id'          => $check_user['Customer']['id'],
					 'fullname'     => $check_user['Customer']['fullname'],
					 'login_via'        => $this->request->data['provider'],
					 'email_id'			=> $check_user['Customer']['email_id']
				);
			
				$this->Session->write('customerInfo', $customerSessionInfo);
				echo json_encode(array('isloggedin'=>1,'customerInfo' => $this->Session->read('customerInfo')));
			}
	}



	//Forget Password functionality for Front End
	function forgetpassword()
	{
		$this->autoRender = false;


		if($this->request->is('Post'))
        {
        	if(!empty($this->request->data))
			{
				if(empty($this->request->data['email_id']))
				{
					echo json_encode(array('isForgot'=>0,'message' =>'Please Provide Your Email Adress that You used to Register with Us'));
				}
				else
				{
					$email=$this->request->data['email_id'];
					$fu=$this->Customer->find('first',array('conditions'=>array('Customer.email_id'=>$email)));

					if($fu)
					{

							$key = Security::hash(CakeText::uuid(),'sha512',true);
							$hash=sha1($fu['Customer']['email_id'].rand(0,100));
							$url = $this->frontURL.'/#/resetpassword?token='.'/'.$key.'#'.$hash;

							$viewData=$url;

							$viewData=wordwrap($viewData,1000);

							$fu['Customer']['tokenhash']=$key;
							$this->Customer->id=$fu['Customer']['id'];

							//$admin_details = $this->Setting->find('all');

							if($this->Customer->saveField('tokenhash',$fu['Customer']['tokenhash']))
							{
								$this->set('viewData', $viewData);
								$Email = new CakeEmail('default');

								$Email->viewVars(compact('viewData'))
									  ->template('resetpassword_customer','default')
									  ->emailFormat('html')
									  ->subject('Reset your Password')
									  ->to($fu['Customer']['email_id'])
									  ->from('admin@mysite.com')
									  ->send();

								echo json_encode(array('isForgot'=>1,'message' =>'Check Your Email To Reset your password'));
							}
							else
							{
								echo json_encode(array('isForgot'=>0,'message' =>'Error Generating Reset link'));
							}

					}
					else
					{
						echo json_encode(array('isForgot'=>0,'message' =>'Error! Email does Not Exist'));
					}
				}
			}
        }
	}



	// Reset password functionality for customer
	function resetpassword($token=null) 
	{
		$this->autoRender=false;


		if($this->request->is('Post'))
        {
        	$t1 = $this->request->data['token'];
        	$t2 = urldecode($t1);
        	$t3 = explode("#", $t2);
        	$token = str_replace("/","",$t3[0]);

        	if(!empty($token))
        	{
				$u=$this->Customer->findBytokenhash($token);
				if($u)
				{
						$this->Customer->id=$u['Customer']['id'];
						$new_hash=sha1($u['Customer']['email_id'].rand(0,100));
						$this->Customer->data['Customer']['tokenhash']=$new_hash;
						$this->Customer->data['Customer']['password'] = $this->Auth->password($this->request->data['password']);
							if($this->Customer->save($this->Customer->data))
							{
								echo json_encode(array('isReset'=>1,'message' =>'Success! Password Changed. Click on the "Log In" link below to view our site.'));
							}
				}
				else
				{
					echo json_encode(array('isReset'=>0,'message' =>'Error! Token Corrupted, Please Try again.'));
				}
			}
		else
		   {
				echo json_encode(array('isReset'=>0,'message' =>'Error! Token not found.'));
			}
        }
	}



	// Customer Logout from the site
	function logout()
	{
		$this->autoRender=false;
		$this->Session->delete('customerInfo');
		echo json_encode(array('isLogOut'=>1,'message' =>'Logged out'));
	}


	//Send Email to Admin after a new Sign Up
	function sendNewSignUpMailAdmin($customerData)
	{
		$this->autoRender = false;
		$Email = new CakeEmail('default');

		$Email->viewVars(compact('customerData'))
			  ->template('newsignup_admin','default')
			  ->emailFormat('html')
			  ->subject('A new User has registered')
			  ->to('sanchari@matrixnmedia.com')
			  ->from('noreply@mysite.com')
			  ->send();
	}


	//Send Email to Customer after a new Sign Up
	function sendNewSignUpMailCustomer($customerData)
	{
		$this->autoRender = false;
		$Email = new CakeEmail('default');

		$Email->viewVars(compact('customerData'))
			  ->template('newsignup_customer','default')
			  ->emailFormat('html')
			  ->subject('Welcome to My Site')
			  ->to($customerData[0]['email_id'])
			  ->from('admin@mysite.com')
			  ->send();
	}
}
?>