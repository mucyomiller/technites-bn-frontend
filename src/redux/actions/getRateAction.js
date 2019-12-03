/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import httpservice from "../../services/httpServices";
import * as actions from "./actionType";
import { toast } from 'react-toastify';

export const getRate = id => async dispatch => {
	try {
		const response = await httpservice.dbCall.get(`/accommodations/${id}/ratings`);
		dispatch({
			type: actions.GET_RATE,
			payload: response.data.average,
		});

	} catch (error) {
		toast.error("Oops something went wrong");
	}
};
