module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/**/index.{js,jsx,ts,tsx}',
    ],
    coverageReporters: ['html', 'text-summary'],
    },
    testMatch: [
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        },
    },
    bail: 1,
    verbose: true,
    transform: {
        '^.+\\.(jsx|js)$': 'babel-jest',
    },
};