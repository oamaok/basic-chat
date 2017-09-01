import React from 'react';

export default function StatusIndicator({ online }) {
  return (
    <div className={online ? 'status-indicator online' : 'status-indicator'} />
  );
}
