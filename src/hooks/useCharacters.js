import { useReducer, useEffect, useCallback, useRef } from 'react';
import { fetchCharacters } from '../services/api/characterService';
import { DEFAULT_PAGE } from '../constants';

const initialState = {
  characters: [],
  pageInfo: null,     // { count, pages, next, prev }
  loading: false,
  error: null,
  errorStatus: null,     // HTTP status code (e.g. 404) — drives UI branching
  page: DEFAULT_PAGE,
  name: '',
  status: '',
  retryCount: 0,   // forces useEffect re-run on retry
  retryAttempts: 0,   // how many times user has clicked Retry (used for UI escalation)
};

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_PAGE: 'SET_PAGE',
  SET_FILTERS: 'SET_FILTERS',
  RETRY: 'RETRY',        // ← dedicated retry action
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        characters: action.payload.results,
        pageInfo: action.payload.info,
        error: null,
        errorStatus: null,
        retryAttempts: 0,
      };

    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        errorStatus: action.payload.status ?? null,
        characters: [],
        pageInfo: null,
      };

    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };


    case ACTIONS.SET_FILTERS:
      return { ...state, ...action.payload, page: DEFAULT_PAGE, retryAttempts: 0 };


    case ACTIONS.RETRY:
      return {
        ...state,
        error: null,
        loading: true,
        retryCount: state.retryCount + 1,
        retryAttempts: state.retryAttempts + 1,
      };

    default:
      return state;
  }
};

const useCharacters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const abortRef = useRef(null);

  const loadCharacters = useCallback(async (page, name, status) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: ACTIONS.FETCH_START });

    try {
      const data = await fetchCharacters({ page, name, status, signal: abortRef.current.signal });
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (err) {
      // Ignore intentional cancellations (unmount / filter change)
      if (err?.code === 'ERR_CANCELED' || err?.name === 'AbortError') return;
      dispatch({
        type: ACTIONS.FETCH_ERROR,
        // Pass both message and HTTP status so the UI can branch on 404 vs real errors
        payload: {
          message: err?.message ?? 'Failed to fetch characters. Please try again.',
          status: err?.status ?? 0,
        },
      });
    }
  }, []);

  useEffect(() => {
    loadCharacters(state.page, state.name, state.status);
    return () => abortRef.current?.abort();
  }, [state.page, state.name, state.status, state.retryCount, loadCharacters]);

  const setPage = useCallback((page) => dispatch({ type: ACTIONS.SET_PAGE, payload: page }), []);
  const setFilters = useCallback((filters) => dispatch({ type: ACTIONS.SET_FILTERS, payload: filters }), []);

  const retry = useCallback(() => {
    dispatch({ type: ACTIONS.RETRY });
  }, []);

  const resetAndRetry = useCallback(() => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: { name: '', status: '' } });
  }, []);

  return {
    characters: state.characters,
    pageInfo: state.pageInfo,
    loading: state.loading,
    error: state.error,
    errorStatus: state.errorStatus,
    page: state.page,
    name: state.name,
    status: state.status,
    retryAttempts: state.retryAttempts,
    setPage,
    setFilters,
    retry,
    resetAndRetry,
  };
};

export default useCharacters;
