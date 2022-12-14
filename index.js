
const prompt = require('prompt-sync')();
const { writeFileSync, readFileSync } = require('fs');
const { stringify } = require('querystring');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    err: process.stderr
})



const getUser = () => {
    const id = prompt('add user id:  ');
    const userList = JSON.parse(readFileSync('userDB.json'))
    const result = userList.filter((item) => item.id === id)
    if (!result.length) { console.log('not found ') }
    else { console.log(result)}
    startAction();
}

const updateUser = () => {
    try {
        const userList = JSON.parse(readFileSync('userDB.json'))
        const userModel = {}
        userModel.id = userList.length;
        const name = prompt('what is your name ? ');
        userModel.name = name
        const email = prompt('what is your email ? ')
        userModel.email = email
        const password = prompt('what is your password ?')
        userModel.password = password;
        const age = prompt('what is your age ?')
        userModel.age = age;
        const country = prompt('what is your country ?')
        userModel.country = country;
        const language = prompt('what is your language ? ')
        userModel.language = language
        let isStudent = prompt('are you a student?  please enter  > yes < for confirm and any else to deny: ')
        isStudent === 'yes' ? isStudent = true : isStudent = true;
        userModel.isStudent = isStudent
        console.log('user added to the data successfull \n');
        console.log(userModel);
        userList.push(userModel);
        writeFileSync('userDB.json', JSON.stringify(userList))

        console.log('user added succesful\n');
        startAction()

    }
    catch (err) {
        console.log(err);
    }

}



const startAction = async () => {
    let myChoice = 0
    readline.question(' what do you like to do ? press 1 for update  a new user,  and 2 for get all users : ', (answer) => {
        myChoice = parseInt(answer)
        readline.close(myChoice)

    });
    readline.on('close', () => {
        if (myChoice === 1) {
            updateUser();
        }
        else if (myChoice === 2) {
            getUser();
        }
        else {
            console.log('wrong input..  please fill  the right choice with integer number ');
            startAction();
        }

    })
}


try {

    const userDB = writeFileSync('userDB.json', JSON.stringify([]))
    startAction();
} catch (err) {
    console.log(err);
}














