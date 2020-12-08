## /users
/login
```
type: post
body: {
		username: string(),
		password: string(),
}
response: {
    status: int(http_code),
    username: string,
    name: {
        given: string,
        family: string,
    },
    type: enum[user|admin],
    accessToken:
}
```
/createAdmin
```
type: post
body: {
		username: string(),
		password: string(),
		first_name:string(),
		last_name:string(),
}
response:{
    "status": http_code,
    "message": string,
    "data": {
        "_id": objectId,
        "username": string,
        "password": string(hashed),
        "type": string,
        "name": {
            "given": "string,
            "family": string
        }
    }
}
```
## /package
/
```
type: get
body: none
authorization: bearer
response: {
    status: int(http_code),
    data: array(packages)
}
```
/ids
```
type: get
body: array[objectId,...]
authorization: bearer
response: {
    status:http_status,
    data:array(packages)
}
```
/id/:packageId
```
type: post
body: none
authorization: bearer
response: {
    status: int(http_code),
    data: object(package)
}
```
/:packageId
```
type: post
body: none
authorization: bearer
response: {
    status: int(http_code),
    data: object(package)
}
```