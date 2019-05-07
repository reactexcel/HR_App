# HR_App

## Getting Started

```bash
$ git clone https://github.com/reactexcel/HR_App.git
$ cd HR_App/frontend
$ npm install 

#### Setup enviornment with any one of the below methods.

1. If you want to run the app on port with development APIs and deploy with live APIs then add two files `.env.development` & `.env.production`. and set the env variables as below.
  ###### .env.development
  ```
  REACT_APP_HOST_ENV=development
  REACT_APP_BASE_URL=development_api_base_url     # i.e. http://dev.hr.excellencetechnologies.in/HR_App
  ```
  ###### .env.production
  ```
  REACT_APP_HOST_ENV=production
  REACT_APP_BASE_URL=live_api_base_url    # i.e. https://hr.excellencetechnologies.in
  ```
  2. if you want to run and build both with the same APIs then just add a `.env` file and set the env variables as below.
 ```
  REACT_APP_HOST_ENV=production
  REACT_APP_BASE_URL=api_base_url     # any either development or production base url
  ```

Enviornment setup is finished. Now run the app with 

### Running Application
```
$ npm start                # Compile and launch
```
It will launch the browser automatically, but if not,  Then open `http://127.0.0.1:3000` in browser.

### Deploy on server 
  Follow the steps below to deploy on development server

  1. Commit and push the changes on git repository.
  
  2. Do the ssh login to the dev server in terminal.
  
  3. Go to the project directory and build the app
```bash
$ cd ~/public_html/HR_App
$ git pull origin dev      # take pull from updated branch which you want to deploy (must be CRA framework)
$in HR_App there are two folders 
   1)backend
   2)frontend
   go to frontend 
$ npm run build            # Before build make sure is has .env file and base url(`REACT_APP_BASE_URL`) set in it . 
```

  It's done !
  You can now run the dev server `http://dev.hr.excellencetechnologies.in/hr/cra/#/` in your browser.

  NOTE: if `ReactReduxHR` not exist, then you have first clone the project and then follow the above steps.
