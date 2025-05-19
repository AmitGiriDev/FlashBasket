import axios from 'axios';

import config from '../config';
import {UpdateUserLocation} from './authService';

export const reverseGeocode = async (
  latitude: Number,
  longitude: Number,
  setUser: any,
) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.GOOGLE_API_KEY}`,
    );
    if (res?.data?.status == 'OK') {
      const address = res.data.results[0].formatted_address;
      console.log(address);

      UpdateUserLocation(
        {liveLocation: {latitude, longitude}, address},
        setUser,
      );
    } else {
      console.error('Geo code failed', res.data);
    }
  } catch (error) {
    console.error('Geo code failed', error);
  }
};
