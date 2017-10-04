# 1. All components name are in small letter
# 2. Camel case title means another component is beign called
# 3. // c-flag #2 :: a flag number in comment line to find a particular location   
# 4. (done) :: These components are ready 
# 5. Project Building & Uploading Rules
# ------------------------------------------------------------------------------
# -------- Component Lists ------
## ------- Editor Component ----- (editor)
    1. canvas    :: This is the viewport of the project or main editor viewport (done)
    2. bglist    :: ( background ) This is for the background image list & Colors (done)
    3. cropper   :: Where image is repositioned and cropped (done)
    4. preview   :: After clicking "Save and test or sare or download" a popup appears showing the edited result (done)
    5. toolbar   :: Where all the tooloptions are included (done)
    6. templates :: (Art Works) Loaded with saved and dummy templates (done)
    // ------------- 
    7. upimage :: (Upload image area) where user will upload the images (done)
    8. typography :: for font edit options (done)
    9. elements :: shape and lines (done)
    10. filters :: effect options or image filters (done)

## ------- Global Components -----
    1. header  :: top most menu and logo (done)
    2. sizebar :: user to select size of the canvas (done)

## ------- account component ----- (account)
    1. New Design :: this will show "template" component as it is same 
    2. mydesign :: this will show user's saved designs or templates (done)
    3. accsetting :: (Account Settings) all settings of account (done)
        1. accountedit :: editable account options (done)
        2. accountinfo :: (right side) holds account information (done)
        3. activitylist :: holds all the activity history (done)
    4. billingdetails :: holds all the billing information (done)
    5. acclinks :: left side panel to have account options (done)

## ------- checkout Component ----- (checkout)
    1. orders :: shows the order summery
    2. billinginfo :: input fields for billing information
    3. paymentinfo :: inputs for payment information  

## ------- CMS Components ----- 
    1. about :: about the site (done)
    2. pricing :: pricing detials of images (done)
        1. checkout :: Checkout details of pricing (done) 
    3. contact :: contact with the admin (done)
    4. howworks :: how it works (done)

# ------------------------------------------------------------------------------
# ---------------- Folder Management ----------------
For the project manage and developement, this project is following  AngularCli folder structure
#  -  Folder Name : 'assets'
#                   1. bacground : All background images which will be added for background 
#                   2. css : 
                            'font-awesome.min.css' : 
                            'jquery-ui.css' : jQuery UI part, dragging, resizable
                            'layout.css' : Technically global css for all compnents
#                   3. elements :  Calling elements in the project, shapes, icons etc
                            'shapes'
#                   4. fonts:                                                                                
                            'fontawesome-webfont'
                            'glyphicons-halflings-regular'
#                   5. images:
                            'watermark' : image for watermark
                             other website images
#                   6. js:
                            'app.js' : no use will be deleted
                            'cropBox.js' : using for cropping
                            'html2canvas.js ' : converting the template of work into canvas from html doc
                            'image-app-plugins.js' : created custom plugins, more descriptions are inside this file
                            'jquery-ui.js' : jQuery ui plugin, dragging and resizing
#                   7. templates : This folder for admin defined templates
                            'images' : template view images are here
                            'template.json' : (comming soon..), currently static json format is beign used under        
                                               template.component.ts
# ------------------------------------------------------------------------------
## Components and its functionalities :
#   'elements':
     elements.component.html: 1.Gets 'element' name and folder from array 'public editableElements' and repeats in a  
                                double loop. Parent loop for the folder path and child loop is for the files.
                              2. folder & file link is './assets/elements/(folder)/(shape.png)'.  
     elements.component.ts :
# 
   /*
  * Created on : 27/04/2017 (dd/mm/yyyy)
  * 'public editableElements' : A JSON of elements folders and files.
                                [0] = shapes;
                                [1] = lines;
    'public elementCount' : A number for incremental value of ID.
    'addElem(index)' : Function to add elements.

  * This Component to add Shaps, lines, icons, photos into the editor.
  * Concept :: Currently this component is using a public class ('shapes'), where all elements's name with extension 
               are stored, by clicking on it, this 'addShape(index)' function triggered. Which append the the element
               in html with unique 'index'  ID.
  
  * Extensions : This document is using these image extensions:
                 1. .png
                 2. .jpg
  * This system is not using vector graphics like .svg, cause './assets/js/html2canvas.js' library is not supporting
    svg rendering.
  */
# ------------------------------------------------------------------------------     
#   'typography' 
     typography.component.html : input types with same class name 'textedit' and button with 'textdeco' class name
     typography.component.ts :
#
 /*
  * 'showAligns' : is a boolean for showing text-align options.
                   The '*ngif' method is called inside typography.component.html.

  * '// c-flag #1' : This is simple jQuery function for editing text element.
                     Concept is each 'input' type has 'data-type' attributes, matching its string value its updates
                     the current selected text's inline style.

  * '// c-flag #2' : This function contains click and add effect concept, this also updates the 'data-type'
                      Attribute.   
  * '// c-flag #3' : This is for color picker method for text                                        
  */ 
# ------------------------------------------------------------------------------     
#   'templates'
     templates.component.html : 
                        *ngFor="let tepmplate of templates; let tempi = index" (click)="changetemp(tempi)"
                        <img src="./assets/templates/images/{{tepmplate.viewimage}}.jpg" alt="{{tepmplate.viewimage}}">
                        {{tepmplate.title}}
                        {{tepmplate.category}}

     templates.component.ts : 
#
/*      Name : TemplatesComponent
   *    classes : 
   *          1. 'templates' - (type 'public') : This is a json array
   *              structure :{
   *                           'viewimage': 'tempone', (template image from '.assets/templates/images') 
   *                           'filter': 'blur2', (Template filter applied during editing)
   *                           'imageattr': [
   *                                         {
   *                                           'imgsrc': 'one',  (image name from '.assets/background'
   *                                           'bgsizew': '293.28px 195.52px', (background-size in '#imageBox')
   *                                           'bgpos': '5px 58px' (background-position in '#imageBox')
   *                                         }
   *                                       ],
   *                           'elements': `<div class="draggable" style="position: absolute; left: 106px; top: 0px;">
   *                                           <div class="resizable">
   *                                             <div class="edtitableContent"style="color: rgb(30, 202, 38);">Dummy Text</div>
   *                                            </div>
   *                                         </div>`,
   *                            (elements appended during editing, draggin and resize related claases and extra elements should be remove before saving)
   *                           'category': `Bikers`, (category name)
   *                           'title': `Cafe racer` (title)
   *                          }
   * 
   *    constructor : calls the 'ImageoptionsService' service, type private.
   *    'changetemp(index)' : calls updateData() method from 'ImageoptionsService' service
   *         // c-flag #1 : sets the "#imageBox" background-size and background-position from 'templates' json
   *         // c-flag #2 : Passing the crop event as mentioned in the './assets/js/cropBox.js' plugin
   *         // c-flag #3 : aplying image filter from the value templates.filter;
   *         // c-flag #4 : appending elements from templates.elements;
   *         // c-flag #5 : single click method, setting 'contentEditable' = true; draggable enable
   *         // c-flag #6 : double click method, contentEditable = true, draggable disable
*/
#     
# ------------------------------------------------------------------------------ 
#   'bglist'
     bglist.component.html :
                     *ngFor="let background of backgrounds; let imgi = index" (click)="changebg(imgi)"
                     <img src="./assets/background/{{background}}.jpg" alt="{{background}}" />
     bglist.component.ts :
#
/* 
   * Name : BglistComponent
   * classes : 
   *          1. backgrounds (type : public)
   *             structure : arrray ['item1', 'item2', 'item3' ..]
   * constructor : calls the 'ImageoptionsService' service, type private.
   * 'changebg(index)' : calls updateData() method from 'ImageoptionsService' service
   *         // c-flag #1 : apllies cropbox() method from './assets/js/cropBox.js' plugin to ".imageBox"
   *         // c-flag #2 : applying image-filter
*/  
#
# ------------------------------------------------------------------------------    

## ============= Project Building & Uploading Rules ============================
Hi guys, 
    There are some rules for this project building and uploading.
#   Why ??
    There are two builds for this particular project
        1. Admin Editor section :: Admin can only view the editor page with some true and false condition 
                                   ** for more info check editor component document 
        2. User Editor section :: Full roaming freedom throughout the website
#   Rules :: 
*   Admin Buld :-
                1. app.router.ts : Comment all router path and its childs except the 'editor'
                                    Remove canActive attribute from 'editor' path
                2. session.json : Located at 'assets' folder
                                  Set the "isLoggedIn" value to 1 (number)
                3. Redirect Path : { path: '', redirectTo: 'editor', pathMatch: 'full' }                                  

*   User Build :-  
                1. app.router.ts : Make sure none of the paths are commented
                                   Add canActive attribute from 'editor' path, 'canActivate:[AuthGuardService]'
                2. session.json : Located at 'assets' folder
                                  Set the "isLoggedIn" value to 0 (number)   
                3. Redirect Path : { path: '', redirectTo: 'login', pathMatch: 'full' }                                                                         
                    



     




