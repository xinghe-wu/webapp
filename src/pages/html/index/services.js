import axios from 'axios';
import {
    Toast
} from 'vant';
const ip = 'http://www.tingdaoapp.com';
// const ip = 'http://192.168.0.103:8080'
export const base = `${ip}/api`;
export const src = `${ip}/static/upload/`;
export const fmSrc = `${ip}/audio/`;

export const getPath = () => {
    if ('prod' == 'development') {
        return '';
    } else {
        return api.wgtRootDir + '/dist';
    }
    ˆ
}

var instance = axios.create({
    baseURL: base,
    timeout: 8000
});

instance.interceptors.response.use(function (response) {
    const rep = response.data;
    if (rep.code == 0) {
        return rep.response;
    } else {
        //Toast.fail(rep.msg);
        return null;
    }
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export const login = (params) => instance.post(`/member/mobile/login`, params);
export const loginByWx = (params) => instance.post(`/member/login`, params);
export const getUserInfo = token => instance.get(`/member/${token}`);
export const getUserMsg = token => instance.get(`/member/msg/${token}`);
export const postUserMsgDel = (params) => instance.post(`/member/msg/del`, params);

export const getSubscribes = token => instance.get(`/member/subscribe/${token}`);

export const postSubscribes = (params) => instance.post(`/member/subscribe`, params);
export const postcolumnDel = (params) => instance.post(`/member/columnDel`, params);
export const postcolumnLike = (params) => instance.post(`/member/columnLike`, params);
export const postcolumnLikePostion = (params) => instance.post(`/member/columnLike/postion
`, params);

export const getMsg = token => instance.get(`/member/getMsg/${token}`);

export const getProgramListen = token => instance.get(`/member/programListen/${token}`);
export const postProgramListen = (params) => instance.post(`/member/programListen`, params);
export const postProgram = (params) => instance.post(`/member/programListen`, params);
export const getVideo = (params) => instance.get(`/radio`, {
    params
});
export const getColumnParam = (params) => instance.get(`/column_param`, {
    params
});



export const getRadioList = (params) => instance.get(`/radioList`, {
    params
});
export const getVideoDetail = (id) => instance.get(`/radio/${id}`);
export const postVoice = params => instance.post('/radio/voice', params);

export const getVoice = (id) => instance.get(`/radio/vote/${id}`);

export const postInfo = params => instance.post('/radio/info', params);

export const getPush = (id) => instance.get(`/radio/activity/${id}`);
export const joinActivity = (params) => instance.post(`/radio/activity/join`, params);
export const getMyActivity = (params) => instance.get(`/radio/activity/join`, {
    params
});

export const getActivity = (params) => instance.get(`/radio/activity`, {
    params
});
export const getColumn = (params) => instance.get(`/radio/column`, {
    params
});

export const getColumnById = (params) => instance.get(`/radio/column/id`, {
    params
});

export const getColumnDel = (params) => instance.get(`/radio/columnDel`, {
    params
});
export const getColumnLike = (params) => instance.get(`/radio/columnLike`, {
    params
});



export const getProgram = (params) => instance.get(`/radio/program`, {
    params
});

export const getColumnListen = (params) => instance.get(`/radio/columnListen`, {
    params
});

export const getCode = (params) => instance.get(`/member/code`, {
    params
});

export const postmemberEdit = (params) => instance.post(`/radio/compereEdit`, params);


export const getTags = (params) => instance.get(`/radio/tags`, {
    params
});
export const postTags = (params) => instance.post(`/radio/tags`, params);
export const getDefaultFm = (params) => instance.get('/radio/default', {
    params
});
export const setDefalutFm = params => instance.post('/radio/default', params);

export const getLive = params => instance.get('/radio/live', {
    params
});
export const getCompere = params => instance.get('/radio/compere', {
    params
});
export const postCompereFollow = (params) => instance.post(`/radio/compereFollow`, params);

export const getCompereSort = params => instance.get('/radio/compere_sort', {
    params
});
export const getCompereRecom = params => instance.get('/radio/compereRecom', {
    params
});
export const getCompereById = params => instance.get('/radio/compereById', {
    params
});


export const getLiveStatus = id => instance.get(`/radio/live/radio?id=${id}`);

export const putMy = (token, params) => instance.put(`/member/${token}`, params);
export const uploadPic = (params) => instance.post(`/radio/voice/upload/pic`, params);
export const uploadFile = (params) => instance.post(`/radio/voice/upload/file`, params);
export const delPrograms = (params) => instance.post(`/radio/delPrograms`, params);
export const postLucky = (params) => instance.post(`/radio/lucky`, params);

export const getLucky = id => instance.get(`/radio/lucky/${id}`);
export const getLuckyList = params => instance.post(`/radio/lucky/win`, params);
export const getMyLucky = token => instance.get(`/radio/lucky/win/` + token);

export const postVote = (params) => instance.post(`/radio/activity/vote`, params);

export const getWin = token => instance.get(`/radio/msg/win/${token}`);


export const getNews = (params) => instance.get(`/radio/news`, {
    params
});

export const getNewsComment = (params) => instance.get(`/radio/newsComment`, {
    params
});

export const postNewsComment = (params) => instance.post(`/radio/newsComment`, params);
export const postNewsZan = (params) => instance.post(`/radio/newsZan`, params);
export const getInfos = (params) => instance.get(`/radio/info`, {
    params
});

export const getMsgZan = (params) => instance.get(`/member/msgZan`, {
    params
});

export const getInfoComment = (params) => instance.get(`/radio/infoComment`, {
    params
});
export const postInfoComment = (params) => instance.post(`/radio/infoComment`, params);
export const postInfoZan = (params) => instance.post(`/radio/infoZan`, params);
export const postInfoDel = (params) => instance.post(`/radio/infoDel`, params);

export const getPayCreate = (params) => instance.post(`/radio/payCreate`, params);