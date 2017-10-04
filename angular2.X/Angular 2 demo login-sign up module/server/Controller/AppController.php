<?php
App::uses('Controller', 'Controller');

class AppController extends Controller {
	public $components = array(
        'Session','Cookie','RequestHandler',
    		'Auth' => array(
				'unauthorizedRedirect' => false,
			)
	);


	public function beforeFilter()
	{
		$this->set('isLoggedIn',$this->Auth->loggedIn()) ;
		$this->set('authUsers',$this->Auth->user());
		$this->Auth->allow() ;
        $this->Auth->allow('forgetpassword','reset');
	}
}
