import { createStore } from '../hooks/useStore';

export const useStore = createStore({
  user: {
    name: 'Bob',
  },
  count: 15,
});
