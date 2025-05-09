import '@testing-library/jest-dom';
import React,{act} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import MyForm from "./MyForm";

test('Form set/get Value Test', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<MyForm />);

    const setValue = screen.getByRole('button', {name: 'setValue'});
    expect(setValue).toBeInTheDocument();

    act(() => {
        fireEvent.click(setValue);
    });

    const getValue = screen.getByRole('button', {name: 'getValue'});
    expect(getValue).toBeInTheDocument();

    act(() => {
        fireEvent.click(getValue);
    });

    expect(consoleSpy).toHaveBeenCalledWith('test');
    consoleSpy.mockRestore();
});

test('Form validate Test 1 ', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<MyForm />);

    const setValue = screen.getByRole('button', {name: 'setValue'});
    expect(setValue).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(setValue);
    });

    const validate = screen.getByRole('button', {name: 'validate'});
    expect(validate).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(validate);
    });

    expect(consoleSpy).toHaveBeenCalledWith("true");
    consoleSpy.mockRestore();
});

test('Form validate Test 2 ', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<MyForm />);

    const validate = screen.getByRole('button', {name: 'validate'});
    expect(validate).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(validate);
    });

    expect(consoleSpy).toHaveBeenCalledWith("false");
    consoleSpy.mockRestore();
});


test('Form getFieldProps Test', async () => {

    render(<MyForm />);

    const getTest = screen.getByRole('button', {name: 'getTest'});
    expect(getTest).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(getTest);
    });

});


test('Form submit Test', async () => {

    render(<MyForm />);

    const submit = screen.getByRole('button', {name: 'submit'});
    expect(submit).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(submit);
    });

});