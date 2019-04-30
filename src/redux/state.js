export default function getUsers () {
    return users;
}

export let users =  [
    {id : 1, name : 'Joseph', surname: 'Biden', email: 'biden@com.ua' },
    {id : 2, name : 'Barry',  surname: 'Unsworth', email: 'unsworth@com.ua' },
    {id : 3, name : 'Bobby-Gaye',  surname: 'Wilkins', email: 'wilkins@com.ua' },
    {id : 4, name : 'Christie',  surname: 'Wilson', email: 'wilson@com.ua' },
    {id : 5, name : 'Greg', surname: 'Howard', email: 'howard@com.ua' }
];

export function saveUserData (userChange) {
    users = users.map((user) => {
        if(user.id === userChange.id ) {
            user = userChange;
        }
        return user;
    });
}
