module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1',
    },
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