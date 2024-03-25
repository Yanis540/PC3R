


declare global {
    interface User {
        id: String 
        name: String 
        email: String 
        photo ?: String 
        createdAt ?: String 
        updatedAt ?: String 
    }
    interface Tokens {
        access : string
    }
    interface HTTPError {
        error : {
            message : string 
            code : string 
        }
    }
}

export {}