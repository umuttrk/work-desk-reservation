# work-desk-reservation-app
## Technologies:
*  Node.js
*  Express.js
*  MySql
*  React.js
*  JWT


## Project Details

#### There are only 2 type desk group. Hexagon and rectangle desk groups. In case of a change in the location of the desks in the office, the application can be updated thanks to the admin page.
#### Url: 'localhost:3000/admin' redirects to admin page that admin-only interface to control floors and position of desks.
#### By clicking the edit button next to the floor that wanted to edit, redirects to the editing page.


![image](https://github.com/umuttrk/work-desk-reservation/assets/74135564/89f8b582-62f2-4268-88e5-e2495a35af7f)

#### When added new any desk group inserting new row and saving initalize (x,y) location and rotation degree.
#### Initialize values are position x and y : 100 , degree is 0.
![image](https://github.com/umuttrk/work-desk-reservation/assets/74135564/8c5b5cb4-6148-4ba4-af0d-78972567b4b6)

#### To rotate desk group scroll up or down mouse wheel. Each rotation will be -4 or +4 degree.

### Edit desk design page details
Little squares under a desk group indicates the status.
<br/>
![image](https://github.com/umuttrk/work-desk-reservation/assets/74135564/8f022531-55ea-453b-b66f-3257ac7cbb8b)
![image](https://github.com/umuttrk/work-desk-reservation/assets/74135564/65a9325f-3092-459d-9538-8705816f43e2)
![image](https://github.com/umuttrk/work-desk-reservation/assets/74135564/2a702599-fb49-483f-9efb-94338d6b5d07)

* Black Status:
  * Just page loaded or desk group added so, there is no changing on desk group.

* Orange Status:
  * It means that the desk group is rotated or swapped to any point. The desk group is not yet saved in the database. 
* Green Status:
  * Position of desk group and rotation degree of desk group are saved to database.
 
### Backend
There 17 API on this project. These are user operations(login,register,logout), reservation operations(getMyReservations,reserveDesk,deleteMyReservation,filter,...) and admin-based operations(createDesk,updateDesk,deleteDesk,...)
and finally, the refreshToken API that needs a little explaining.

#### Authentication

Some API's when requested from client have to be sent also mail address and access Token in headers. In the verify middleware it first checks ,whether is mail inside payload of access Token is equal to clients mail or not. If not returns 401 so not authenticated. If yes, accessToken verifying with SECRET_KEY then, if it's expired returns status is expired. 
If returns ```status:expired``` in the client-side fetching refreshToken API it provides to regenerating accessToken and refreshtoken and call ownself like recursive method.


## TODO
* User profile update page
* Pagination for showMyReservations
* Limitations for reservations
* Improvement adminControl pop-up
* Associate user mail with reserved_by
* ...
