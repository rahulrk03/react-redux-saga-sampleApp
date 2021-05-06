import {call, put, takeEvery} from 'redux-saga/effects';


const apiURl = "https://jsonplaceholder.typicode.com/users";

function getApi (){
    return fetch(apiURl, {
        method : 'GET',
        headers: {
            'Content-Type':' application/json',

        }
    }).then(Response => Response.json())
    .catch((error) => {throw error})
}

function* fetchUsers() {
    try{
        const users = yield call(getApi);
        yield put({type: 'GET_USERS_SUCCESS', users:users });
    } catch (e) {
        yield put({type: 'GET_USERS_FAILED', message: e.message});
    }
}

function* userSaga(){
    yield takeEvery('GET_USERS_REQUESTED', fetchUsers);
}

export default userSaga;