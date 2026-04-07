import React, { memo } from 'react';
import { Tag } from 'antd';

// ─── Status → colour mapping ────────────────────────────────────────────────
const STATUS_COLOR = {
  alive:   { dot: '#52c41a', tag: 'success' },
  dead:    { dot: '#ff4d4f', tag: 'error'   },
  unknown: { dot: '#8c8c8c', tag: 'default' },
};

/**
 * Character card — pure presentational component.
 * Wrapped in React.memo: skips re-renders when parent re-renders
 * but this character's data hasn't changed.
 */
const Character = memo(({ character }) => {
  const { name, image, status, species, location } = character;
  const statusKey = status?.toLowerCase();
  const colorMeta = STATUS_COLOR[statusKey] ?? STATUS_COLOR.unknown;

  return (
    <article className="character-card" aria-label={`Character: ${name}`}>
      <div className="character-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="character-card__image"
          loading="lazy"
          decoding="async"
        />
        <span
          className="character-card__status-dot"
          style={{ background: colorMeta.dot }}
        />
      </div>

      <div className="character-card__body">
        <h3 className="character-card__name" title={name}>{name}</h3>

        <Tag color={colorMeta.tag} className="character-card__tag">
          {status}
        </Tag>

        <p className="character-card__meta">
          <span className="character-card__label">Species</span>
          <span>{species}</span>
        </p>

        <p className="character-card__meta">
          <span className="character-card__label">Location</span>
          <span className="character-card__location" title={location?.name}>
            {location?.name ?? 'Unknown'}
          </span>
        </p>
      </div>
    </article>
  );
});

Character.displayName = 'Character';

export default Character;
