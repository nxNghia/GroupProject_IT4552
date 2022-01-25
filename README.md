# Spotify clone app - Soulify
## Prerequisite
- Node.js v14.x
- React.js v17.x
- MongoDb
## Installation
1. Clone the repository
```
git clone https://github.com/nxNghia/GroupProject_IT4552.git
```
2. Make an .env file in ./client
3. Login into Spotify.forDeveloper dashboard if you have a spotify account [Link](https://developer.spotify.com/dashboard/login)
4. Create an app
5. Copy ClientID of your recently created app into .env file with key: REACT_APP_CLIENT_ID
6. Make a second .env file in root folder for backend
7. Add your mongoDb connection string into .env with key: DATABASE_URL
## Usage
1. First run server by
```
npm run dev
```
2. Next run client by
```
npm run client
```
## Author
- Nguyễn Xuân Nghĩa
- Trần Quốc Du
- Ninh Tuấn Đạt
- Hoàng Ngọc Bảo