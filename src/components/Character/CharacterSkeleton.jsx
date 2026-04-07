import React, { memo } from 'react';
import { Skeleton } from 'antd';

/**
 * CharacterSkeleton
 * Renders `count` placeholder cards during loading.
 * Layout matches Character card exactly to prevent layout shift.
 */
const CharacterSkeleton = memo(({ count = 20 }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="character-card skeleton-card" aria-hidden="true">
        <Skeleton.Image active className="skeleton-image" />
        <div className="character-card__body">
          <Skeleton active paragraph={{ rows: 3 }} title={{ width: '70%' }} />
        </div>
      </div>
    ))}
  </>
));

CharacterSkeleton.displayName = 'CharacterSkeleton';

export default CharacterSkeleton;
