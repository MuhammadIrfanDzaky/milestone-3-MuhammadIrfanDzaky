'use client';

import React from 'react';

export default function Loading() {
    return (
    <div data-testid="loading-container" className="flex items-center justify-center h-screen">
        <div data-testid="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
    </div>
    )
}