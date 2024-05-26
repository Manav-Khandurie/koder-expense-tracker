### Koders -- Assignment for Backend Developer Intern
### About the Project
> In this task, your objective is to develop an Express server capable of managing expenses
within the expense table. This server should facilitate the creation, updating, and deletion of
expenses. For recurring expenses, designated by a frequency other than "One-Time," you are
required to implement a Node.js cron-based scheduler or coroutine to update these expenses
daily. This update involves incrementing the amount based on the specified frequency


### Tech Stack

![Static Badge](https://img.shields.io/badge/Node.js-101010?logo=nodedotjs) ![Static Badge](https://img.shields.io/badge/Express-101010?logo=express) ![Static Badge](https://img.shields.io/badge/Docker-101010?logo=docker) ![Static Badge](https://img.shields.io/badge/PostMan-101010?logo=postman) ![Static Badge](https://img.shields.io/badge/Yarn-101010?logo=yarn)



### Running the Project

1. Fork the Project
2. Clone your forked repository

```sh
 git clone https://github.com/<your_github_username>/Rate-Limiter-Service-POC-AWS.git
```
3. Creating the .env File <br>
    Navigate to the root directory of the project.<br>
    Copy the .env.example file to create a new .env file.<br>
   * For Linux or macOS, use the following command:
      ```sh
     cp .env.example .env
     ```
   * For Windows
      ```sh
     copy .env.example .env
     ```

4.  Install Dependencies  
    ```sh
     npm install
     ```
5.  Run the server
    ```sh
     npm start
     ```

6. Server would be running and accepting requests at , use the api docs @ [Visit API Documentation](https://documenter.getpostman.com/view/26811368/2sA3QqhZ1Q)
    ```sh
     http://localhost:3001
     ```