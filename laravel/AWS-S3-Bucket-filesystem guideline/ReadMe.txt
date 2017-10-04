STEP 1::
Add the the below line in composer
"league/flysystem-aws-s3-v3": "~1.0"

from CMD run -> composer update

		OR
Amazon S3: composer require league/flysystem-aws-s3-v3 ~1.0
STEP 2::
Update config/filesystem.php file

's3' => ['driver' => 's3',
	'key'    => env('S3_KEY'),
	'secret' => env('S3_SECRET'),
	'region' => env('S3_REGION'),
	'bucket' => env('S3_BUCKET'),
],

STEP 3::
In Controller Add the below line to include Storage filesystem libraries.

use Illuminate\Support\Facades\Storage;

STEP 4::
Check the below function to manage the local server file to upload and fetch url from AWS.

public function awsFileUpload() {

    	$s3 = Storage::disk('s3');

    	$source = public_path('images/weddingpic2.jpg');
 // Local server file path
		$path = public_path('images/sm/'.date("ny").'/'.date("d").'/');

		$filePath = '/images/l/'.date("ny").'weddingpic2.jpg';
 // Where to upload in AWS server
		$s3->put($filePath, file_get_contents($source), 'public');
 


		echo $url = $s3->url($filePath);
 // return the aws link
    }