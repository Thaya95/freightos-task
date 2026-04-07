import React, { memo } from 'react';
import { Pagination } from 'antd';
import { PAGE_SIZE } from '../../constants';

/**
 * CharacterPagination — thin wrapper around Ant Design Pagination.
 * total comes from pageInfo.count (API), keeping page state in useCharacters.
 */
const CharacterPagination = memo(({ total, current, onChange }) => {
  if (!total) return null;

  return (
    <div className="pagination-wrap">
      <Pagination
        current={current}
        total={total}
        pageSize={PAGE_SIZE}
        onChange={onChange}
        showSizeChanger={false}
        showTotal={(t) => `${t} characters`}
        responsive
      />
    </div>
  );
});

CharacterPagination.displayName = 'CharacterPagination';

export default CharacterPagination;
