import API from 'goals-todos-api';

/**
 * Global Constants
 * @type {string}
 * @constant
 */
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

/**
 * Add Todo
 * @summary Action
 * @param todo
 * @return {{type: string, todo: *}}
 */
function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo
    };
}

/**
 * Remove Todo
 * @summary Action
 * @param id
 * @return {{type: string, id: *}}
 */
function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id
    };
}

/**
 * Toggle Todo
 * @summary Action
 * @param id
 * @return {{type: string, id: *}}
 */
function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id
    };
}


/**
 * Async Add Todo handler
 * @summary Action Creator
 * @async
 * @param name
 * @param callback
 * @return {function(*): Promise<T | never>}
 */
export const handleAddTodo = (name, callback=null) => (dispatch) => {
    //pass the input value to get the item from the api
    return API.saveTodo(name)
    //then pass the item object
    .then((todo) => {
        //update the store with the object using dispatch()
        dispatch( addTodo(todo));
        
        //fire callback function
        callback();
        
        //if there's an error
    }).catch(() => {
        //alert the user
        alert('There was an error.  Try again')
    })
};

/**
 * Async Delete Todo handler
 * @summary Action Creator
 * @param todo
 * @return {function(*): Promise<T | never>}
 * @async
 */
export const handleDeleteTodo = (todo) => (dispatch) => {
    //first we update the state so the UI changes instantly
    dispatch(removeTodo(todo.id));
    //now we can make the api call to the server
    return API.deleteTodo(todo.id)
    //if there's an error
    .catch(() => {
        //add the previously deleted element back
        dispatch(addTodo(todo));
        //and send an alert to the user
        alert('There was an error removing your item. Please try again.');
    })
};

/**
 * Async Toggle Todo handler
 * @summary Action Creator
 * @param id
 * @return {function(*): Promise<T | never>}
 * @async
 */
export const handleToggleTodo = (id) => (dispatch) => {
    //first we update the state so the UI changes instantly
    dispatch(toggleTodo(id));
    //now we can make the api call to the server
    return API.saveTodoToggle(id)
    //if there's an error
    .catch(() => {
        //add the previously toggled element back
        dispatch(toggleTodo(id));
        //and send an alert to the user
        alert('There was an error removing your item. Please try again.');
    })
};