import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gympoint-mobile',
      storage: AsyncStorage,
      whitelist: ['auth', 'student'],
    },
    reducers
  );

  return persistedReducer;
};
