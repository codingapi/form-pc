// __mocks__/monaco-editor.js
module.exports = {
    editor: {
        create: jest.fn(),
        setModelLanguage: jest.fn(),
        getModel: jest.fn(),
        createModel: jest.fn(),
    },
};