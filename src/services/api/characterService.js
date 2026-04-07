import apiClient from './apiClient';

/**
 * Fetches a paginated + filtered list of Rick & Morty characters.
 *
 * @param {{ page?: number, name?: string, status?: string }} params
 * @returns {Promise<{ results: Character[], info: PageInfo }>}
 */
export const fetchCharacters = async ({ page = 1, name = '', status = '' } = {}) => {
  const params = { page };
  if (name)   params.name   = name;
  if (status) params.status = status;

  const { data } = await apiClient.get('/character', { params });
  return data; // { info: { count, pages, next, prev }, results: [] }
};
