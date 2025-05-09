module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^monaco-editor$': '<rootDir>/__mocks__/monaco-editor.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};