import axios from "axios"
import { useReducer, useEffect } from "react"


const ACTION = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

// CORS issue solved by installing 'moesif CORS extension' and then turn on
const BASE_URL = 'https://jobs.github.com/positions.json';

// this reducer is call when dispatch is called
    // currentstate
function reducer(state, action){
    switch(action.type){
        case ACTION.MAKE_REQUEST:
            return {
                loading: true,
                jobs: []
            }
        case ACTION.GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs
            }
        case ACTION.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: []
            }
        default:
            return state
    }
}

export default function useFetchJobs(params, page) {

    // useReducer(function, initialState)
    const [state, dispatch] = useReducer(reducer, {
        jobs: [],
        loading: true
    });


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        dispatch({
            type: ACTION.MAKE_REQUEST
        })
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: {
                markdown: true,
                page: page,
                ...params
            }
        }).then(res => {
            dispatch({
                type: ACTION.GET_DATA,
                payload: {
                    jobs: res.data
                }
            }) 
        }).catch(e => {
            if(axios.isCancel(e)) return
            dispatch({
                type: ACTION.ERROR,
                payload: {
                    error: e
                }
            })
        })

        return () => {
            cancelToken.cancel();
        }
    }, [params, page]);



    // Returning State to the App
    return state
}