import axios from 'axios';

const setAxiosAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['Authrization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Authrization'];
	}
};

export default setAxiosAuthToken;
