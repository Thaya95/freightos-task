import React, { memo, useState, useEffect, useCallback } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { STATUS_OPTIONS, DEBOUNCE_DELAY_MS } from '../../constants';
import useDebounce from '../../hooks/useDebounce';

const { Option } = Select;

/**
 * FilterBar
 *
 * Owns the raw (live) input value so <Input> stays responsive.
 * Only the debounced value is propagated upward — zero API calls
 * while typing, one call 400 ms after the user stops.
 */
const FilterBar = memo(({ name, status, onFiltersChange }) => {
  const [localName, setLocalName] = useState(name);
  const debouncedName = useDebounce(localName, DEBOUNCE_DELAY_MS);

  // Sync debounced name → parent (skip initial mount to avoid duplicate call)
  useEffect(() => {
    if (debouncedName !== name) {
      onFiltersChange({ name: debouncedName, status });
    }
  }, [debouncedName]);

  const handleNameChange = useCallback((e) => setLocalName(e.target.value), []);

  const handleStatusChange = useCallback(
    (value) => onFiltersChange({ name: debouncedName, status: value }),
    [debouncedName, onFiltersChange],
  );

  return (
    <div className="filter-bar" role="search" aria-label="Filter characters">
      <Input
        id="search-name"
        className="filter-bar__search"
        placeholder="Search by name…"
        prefix={<SearchOutlined />}
        value={localName}
        onChange={handleNameChange}
        allowClear
        aria-label="Search characters by name"
      />

      <Select
        id="filter-status"
        className="filter-bar__status"
        value={status}
        onChange={handleStatusChange}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;
