import React, { memo } from 'react';
import { Result, Button, Space } from 'antd';
import {
  ExclamationCircleOutlined,
  InboxOutlined,
  ReloadOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

// ─── ErrorState ───────────────────────────────────────────────────────────────
/**
 * Two-stage error UI:
 *
 * Stage 1 (retryAttempts === 0) — transient error, user hasn't retried yet
 *   → "Something went wrong" + Retry button
 *
 * Stage 2 (retryAttempts >= 1) — error persisted after at least one retry
 *   → "We couldn't load this page" + Go Back + Home buttons
 */
const ErrorState = memo(({ message, onRetry, onGoHome, retryAttempts = 0 }) => {
  const isPersistentError = retryAttempts >= 1;

  if (isPersistentError) {
    return (
      <div className="state-container">
        <div className="persistent-error">
          <div className="persistent-error__icon" aria-hidden="true">🛸</div>
          <h2 className="persistent-error__title">We couldn't load this page</h2>
          <p className="persistent-error__message">
            {message ?? 'The service is temporarily unavailable. Please try again later.'}
          </p>
          <Space size="middle" className="persistent-error__actions">
            <Button
              id="btn-home"
              type="primary"
              icon={<HomeOutlined />}
              onClick={onGoHome}
              size="large"
            >
              Home
            </Button>
          </Space>
        </div>
      </div>
    );
  }

  // Stage 1 — first error, offer a retry
  return (
    <div className="state-container">
      <Result
        icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
        title="Something went wrong"
        subTitle={message ?? 'Unable to load characters. Please try again.'}
        extra={
          <Button
            id="btn-retry"
            type="primary"
            icon={<ReloadOutlined />}
            onClick={onRetry}
          >
            Retry
          </Button>
        }
      />
    </div>
  );
});

ErrorState.displayName = 'ErrorState';

// ─── EmptyState ───────────────────────────────────────────────────────────────
const EmptyState = memo(() => (
  <div className="state-container">
    <Result
      icon={<InboxOutlined style={{ color: '#8c8c8c', fontSize: 64 }} />}
      title="No characters found"
      subTitle="Try adjusting your search or status filter."
    />
  </div>
));

EmptyState.displayName = 'EmptyState';

export { ErrorState, EmptyState };
