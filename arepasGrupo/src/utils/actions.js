// log actions
export const log = (id,Email,Password,FirstName,LastName,BirthofDate,RegisterDate,Address,PhoneNumber) =>{
    return{
        type: 'log',
        id: id,
        Email: Email,
        Password : Password,
        FirstName: FirstName,
        LastName: LastName,
        BirthofDate: BirthofDate,
        RegisterDate: RegisterDate,
        Address: Address,
        PhoneNumber: PhoneNumber
    }
}

export const logout = () =>{
    return{
        type: 'logout'
    }
}

// shopping car actions
export const shopitem = (arepa) =>{
    return{
        type: 'shop',
        id:arepa
    }
}