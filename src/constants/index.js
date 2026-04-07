export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const CHARACTER_STATUS = {
  ALL: '',
  ALIVE: 'alive',
  DEAD: 'dead',
  UNKNOWN: 'unknown',
};

export const STATUS_OPTIONS = [
  { label: 'All', value: CHARACTER_STATUS.ALL },
  { label: 'Alive', value: CHARACTER_STATUS.ALIVE },
  { label: 'Dead', value: CHARACTER_STATUS.DEAD },
  { label: 'Unknown', value: CHARACTER_STATUS.UNKNOWN },
];

export const DEBOUNCE_DELAY_MS = 400;
export const DEFAULT_PAGE = 1;
export const PAGE_SIZE = 20; // Rick & Morty API returns 20 per page
