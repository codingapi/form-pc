import '@testing-library/jest-dom';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import MyForm from "./MyForm";


test('Form set/get Value Test', () => {

    // 模拟 console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<MyForm/>);

    const setValue = screen.getByRole('button', {name: 'setValue'});
    expect(setValue).toBeInTheDocument();

    fireEvent.click(setValue);

    const getValue = screen.getByRole('button', {name: 'getValue'});
    expect(getValue).toBeInTheDocument();

    fireEvent.click(getValue);

    // 断言 console.log 是否输出了 "test"
    expect(consoleSpy).toHaveBeenCalledWith('test');

    // 清除 console.log 的 spy
    consoleSpy.mockRestore();

});