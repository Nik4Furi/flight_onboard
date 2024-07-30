# <h1 id="flight_onboard"> Flight On-Board <span>![GitHub package.json version](https://img.shields.io/github/package-json/v/Nik4Furi/flight_onboard)
</span> </h1>

### Completing the case-study of "Real Time Flight Status Notification"
**Overview/UseCase**: The Flight Status Notification Web Application provides a convenient way for users to stay updated on the status of flights. Users can view a comprehensive list of flights and subscribe to receive email notifications about status updates, including delays, cancellations, and gate changes.



## Indexing the contents

#### <a href="#features" >Features</a>
#### <a href="#badges" >Badges</a>
#### <a href="#demo" >Demo</a>
#### <a href="#stack" >Tech Stack</a>
#### <a href="#sys_design" >System Design</a>
#### <a href="#env" >Environment Vars</a>
#### <a href="#runLocally" >Run Locally</a>
#### <a href="#routersRef" >Routers References</a>


## <h2 id="features">Features </h2>

1. **Flight List Display**: Users can browse a real-time list of flights with their current statuses, making it easy to find the flight they are interested in.
2. **Notification Subscription**: Users can click a "Notify" button next to any flight to subscribe to updates. They will be prompted to enter their email address for receiving notifications.
3. **Email Notifications**: Once subscribed, users will receive email notifications for any updates related to the flight they have subscribed to.
4. **Real-Time Updates**: The application continuously fetches and updates flight status information, ensuring that users always have the latest information.

<a href="#flight_onboard">Go Home </a>



## <h2 id="badges" >Badges </h2>


![GitHub Repo stars](https://img.shields.io/github/stars/Nik4Furi/flight_onboard?style=social) ![GitHub watchers](https://img.shields.io/github/watchers/Nik4Furi/flight_onboard?style=social)

![GitHub top language](https://img.shields.io/github/languages/top/Nik4Furi/flight_onboard)   ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Nik4Furi/flight_onboard?style=flat-square) ![GitHub repo file count](https://img.shields.io/github/directory-file-count/Nik4Furi/flight_onboard) 
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Nik4Furi/flight_onboard)   ![GitHub last commit](https://img.shields.io/github/last-commit/Nik4Furi/flight_onboard)

<a href="#flight_onboard">Go Home </a>



## <h2 id="demo" >Demo </h2>

<p text-align=left>
  <img src="" width="500" height="" alt="flight_onboard_home"/>
    
 </p>
 


<a href="#flight_onboard">Go Home </a>



## <h2 id="stack" >Tech Stack </h2>


**Server:** NodeJS, ExpressJS
**Client:** ReactJS, Chakra UI(UI Templating)
**Database:** MongoDB
**Service:**
    - *Email:* SMTP
    - *Message Queue:* KAFKA
    - *Real Time Connection:* Socket.io


<a href="#flight_onboard">Go Home </a>

## <h2 id="sys_design" >System Design </h2>

Creating the small system desing, to explaing the compatibility of the case-study

(Flight On-Board)[https://app.eraser.io/workspace/OMc8461Eaxnp8bJmx7pd?origin=share]



<a href="#flight_onboard">Go Home </a>


## <h2 id="runLocally" >Run Locally </h2>

Clone the project

```bash
  git clone https://github/Nik4Furi/flight_onboard
```

Go to the project directory

```bash
  cd flight_onboard
```
*Also parallely follow to insert/edi the environment variables, <a href="#env" >.env.exmaple</a>*

#### BACKEND

```bash
  cd backend
```

Install dependencies

```bash
 yarn
```

OR
If yarn not in your system, can use *npm i* to install dependies

``` bash
npm i -g yarn
npm i -g nodemon

yarn -v
```

Start the server or can be use "npm run" command

```bash
  yarn start (start at only time)

  yarn dev (Run or restart, whenever you save any file(js))
```

<a href="#flight_onboard">Go Home </a>


#### DOCKER SERVICES

Installing and running the zookeeper service to run the *Kafka service*

```bash
  docker version # check docker version

  docker run -d --name zookeeper -p 2181:2181 zookeeper
```

Another terminal, connect the *Kafka Service* with zookeeper

*I AM USING WINDOWS TERMINAL*

```bash
  docker version # check docker version

  docker run -d --name kafka --link zookeeper:zookeeper -p 9092:9092 ^
-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 ^
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092 ^
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 ^
confluentinc/cp-kafka
```


Testing

```bash
 docker ps
```

Now run the *Kafka Consumer Service*

``` bash
    cd backend
    nodemon run src/api/v1/service/KafkaConsumer.js
```
<a href="#flight_onboard">Go Home </a>


#### FRONTEND

```bash
  cd frontend
```

Install dependencies

```bash
 yarn
```

Start the server

```bash
  yarn start 

```

<a href="#flight_onboard">Go Home </a>


## <h2 id="env" >Environment Variables </h2>

For more information go to `.env.exmple` file and configure own environment variables
##### Backend: go backend > .env.example
##### Frontend: go frontend > .env.example

<a href="#flight_onboard">Go Home </a>


## <h2 id="routersRef">Routers Reference </h2>


base api route start with **/api/v1**

### Auth Routes

#### Login the admin, who have access to update flight status

route: **/auth/login**, to test this route *frontend > /login*, and insert
`email` : `admin@gmail.com`
`password`:`password`

```http
  POST 
```

| Params | body   | Description                |
| :-------- | :------- | :------------------------- |
| - | `email`,`password` | Login the admin |


<a href="#flight_onboard">Go Home </a>

### Flights Routes

#### Get list of flights

route: **/flight/get**

```http
  GET 
```
| Params | Body   | Description                |
| :-------- | :------- | :------------------------- |
| - | `-` | Fetch list of flights|


#### Update flight status

route: **/flight/updateStatus**
headers: `auth-token`:login user token required

```http
  PUT 
```
| Params | Body   | Description                |
| :-------- | :------- | :------------------------- |
| - | `flight_id`,`status`, `departure_gate`, `arrival_gate`, `actual_departure`,`actual_arrival` | According to **flight_id**, update data|



<a href="#flight_onboard">Go Home </a>

### Notifications Routes

#### Create the notifications

route: **/notification/create**

```http
  POST 
```

| Params | Body   | Description                |
| :-------- | :------- | :------------------------- |
| - | `notification_id`, `flight_id`, `message`, `timestamp`, `method`, `recipient` | Subscribe the user to get update of flights |


<a href="#flight_onboard">Go Home </a>

## <h2 id="sys_design" >Future Development </h2>

I will be store some ideas to improve this case-study assessment
- Added the more or real-time data from `flights apis`
- Added the `phone` sms service
- Add one `dashboard`, and manage all agencies of flights
- One app to all flight on-boards

<a href="#flight_onboard">Go Home </a>
