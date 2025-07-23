import React, { useState } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const examResults = [
    { id: 1, type: 'Экзамен', date: '20.07.2025 11:05', passed: false, correct: 1, wrong: 39, total: 40 },
    { id: 2, type: 'Экзамен', date: '19.07.2025 19:28', passed: false, correct: 5, wrong: 35, total: 40 },
    { id: 3, type: 'Экзамен', date: '19.07.2025 18:40', passed: true, correct: 36, wrong: 4, total: 40 },
    { id: 4, type: 'Экзамен', date: '18.07.2025 12:15', passed: true, correct: 38, wrong: 2, total: 40 },
    { id: 5, type: 'Экзамен', date: '18.07.2025 10:00', passed: true, correct: 37, wrong: 3, total: 40 },
    { id: 6, type: 'Экзамен', date: '17.07.2025 16:30', passed: false, correct: 30, wrong: 10, total: 40 },
    { id: 7, type: 'Экзамен', date: '17.07.2025 15:00', passed: true, correct: 35, wrong: 5, total: 40 },
    { id: 8, type: 'Экзамен', date: '17.07.2025 13:40', passed: true, correct: 40, wrong: 0, total: 40 },
    { id: 9, type: 'Экзамен', date: '16.07.2025 19:20', passed: false, correct: 12, wrong: 28, total: 40 },
    { id: 10, type: 'Экзамен', date: '16.07.2025 17:50', passed: false, correct: 20, wrong: 20, total: 40 },
    { id: 11, type: 'Экзамен', date: '15.07.2025 14:15', passed: true, correct: 39, wrong: 1, total: 40 },
    { id: 12, type: 'Экзамен', date: '15.07.2025 13:30', passed: false, correct: 28, wrong: 12, total: 40 },
    { id: 13, type: 'Экзамен', date: '15.07.2025 10:45', passed: true, correct: 37, wrong: 3, total: 40 },
    { id: 14, type: 'Экзамен', date: '14.07.2025 18:10', passed: false, correct: 7, wrong: 33, total: 40 },
    { id: 15, type: 'Экзамен', date: '14.07.2025 15:55', passed: true, correct: 36, wrong: 4, total: 40 },
];

const PAGE_SIZE = 10;

const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(examResults.length / PAGE_SIZE);
    const paginatedData = examResults.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className='border shadow-lg rounded-3xl mb-10'>
            <h3 className='text-2xl p-5 pb-6'>Результаты тестирования</h3>
            <table className='min-w-full text-sm text-left'>
                <thead className='bg-gray-100 font-medium text-gray-500'>
                    <tr>
                        <th className='p-5'>Тип</th>
                        <th className='p-5'>Дата</th>
                        <th className='p-5'>Статус</th>
                        <th className='p-5'>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id}>
                            <td className='flex items-center gap-3 p-5'><GraduationCap color='orange' strokeWidth={2.75} />{item.type}</td>
                            <td className='p-5'>{item.date}</td>
                            <td className='p-5'>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                    {item.passed ? 'Сдан' : 'Не сдан'}
                                </span>
                            </td>
                            <td className='p-5'>
                                <span className='text-green-600'>Верно: {item.correct}</span>,{' '}
                                <span className='text-orange-500'>Неверно: {item.wrong}</span>,{' '}
                                <span className='text-gray-400'>Всего: 40</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr className='mt-3' />
            <div className='flex justify-end items-center gap-3 py-5 px-7'>
                <button
                    className='px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:opacity-50 transition-opacity duration-150'
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft />
                </button>
                <span className='py-2 px-4 bg-orange-400 rounded-lg text-white'>{currentPage}</span>
                <button
                    className='px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:opacity-50 transition-opacity duration-150'
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight />
                </button>
                <span>{`${paginatedData.length} / ${examResults.length}`}</span>
            </div>
        </div>
    );
};

export default Table;