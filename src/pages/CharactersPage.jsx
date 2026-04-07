import React, { useMemo, useCallback } from 'react';
import Character from '../components/Character/Character';
import CharacterSkeleton from '../components/Character/CharacterSkeleton';
import FilterBar from '../components/FilterBar/FilterBar';
import CharacterPagination from '../components/Pagination/CharacterPagination';
import { ErrorState, EmptyState } from '../components/StateViews/StateViews';
import useCharacters from '../hooks/useCharacters';

/**
 * CharactersPage
 *
 * Feature page that wires together:
 *  – useCharacters  (data, loading, error, pagination, filters, retry)
 *  – FilterBar      (name + status — memoized, debounced)
 *  – Character grid (memoized cards)
 *  – Skeleton / Error / Empty states
 *  – Pagination
 *
 * All handlers are wrapped in useCallback so memo'd children
 * don't re-render when this page re-renders.
 *
 * cardList is wrapped in useMemo so the .map() only runs
 * when the characters array reference changes.
 */
const CharactersPage = () => {
  const {
    characters,
    pageInfo,
    loading,
    error,
    errorStatus,     // HTTP status code — 404 = no results, others = real error
    page,
    name,
    status,
    setPage,
    setFilters,
    retry,
    resetAndRetry,
    retryAttempts,
  } = useCharacters();

  const handleFiltersChange = useCallback(
    (filters) => setFilters(filters),
    [setFilters],
  );

  const handlePageChange = useCallback(
    (newPage) => setPage(newPage),
    [setPage],
  );

  // Memoised card list — .map() only re-runs when characters array changes
  const cardList = useMemo(
    () => characters.map((character) => (
      <Character key={character.id} character={character} />
    )),
    [characters],
  );

  const showEmpty = !loading && !error && characters.length === 0;
  // 404 = API found nothing matching the query — treat as "no results", not a crash
  const is404     = error && errorStatus === 404;

  return (
    <div className="page">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="page__header">
        <div className="page__header-inner">
          <span className="page__logo">🛸</span>
          <div>
            <h1 className="page__title">Rick &amp; Morty</h1>
            <p className="page__subtitle">Character Explorer</p>
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="page__content">
        <FilterBar
          name={name}
          status={status}
          onFiltersChange={handleFiltersChange}
        />

        {/* Results summary */}
        {pageInfo && !loading && !error && (
          <p className="results-count" aria-live="polite">
            {pageInfo.count} results · page {page} of {pageInfo.pages}
          </p>
        )}

        {/* ── Grid ───────────────────────────────────────────────── */}
        <section
          className="characters-grid"
          aria-label="Characters grid"
          aria-busy={loading}
        >
          {loading && <CharacterSkeleton count={20} />}

          {/* 404 → treat as "no results" (user's search found nothing)
              Other errors → two-stage error screen with Retry / Home */}
          {is404 && <EmptyState />}

          {error && !is404 && (
            <ErrorState
              message={error}
              onRetry={retry}
              onGoHome={resetAndRetry}
              retryAttempts={retryAttempts}
            />
          )}

          {showEmpty && <EmptyState />}

          {!loading && !error && cardList}
        </section>

        {/* ── Pagination ─────────────────────────────────────────── */}
        {!error && (
          <CharacterPagination
            total={pageInfo?.count}
            current={page}
            onChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default CharactersPage;
