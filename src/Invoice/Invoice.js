import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import logo from '../logo.png'

const InvoiceGenerator = () => {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        companyName: '',
        companyAddress: '',
        clientName: '',
        clientAddress: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        notes: '',
        currency: 'GHS'
    });

    const calculateSubtotal = () => {
        return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax rate
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...invoiceData.items];
        newItems[index][field] = value;
        setInvoiceData(prev => ({
            ...prev,
            items: newItems
        }));
    };

    const addItem = () => {
        setInvoiceData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (index) => {
        setInvoiceData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const printInvoice = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
        <html>
            <head>
            <title>Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 24px; margin-bottom: 10px; }
                .section-total { float: right; }
                .section-bill-from { float: left; width: 30% }
                .section-bill-to { float: right; width: 40%}
                .section-bill-gap { float: right; width: 30%}
                .section { margin-bottom: 20px; clear: both }
                .section-item { padding-top: 10px; }
                .section h2, .section-bill-to h2, .section-bill-from h2, .section-bill-gap h2 { font-size: 18px; margin-bottom: 8px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                table, th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                .total { font-weight: bold; }
                .text-right { text-align: right; }
                .logo { float: right; width: 150px; margin-top: 10px; }

                /* Watermark style */
            .watermark {
                position: fixed;
                top: 40%;
                left: 12%;
                transform: translate(-50%, -50%);
                opacity: 0.3;
                z-index: -1;
            }
            </style>
            </head>
            <body>
            <img src=${logo} alt="Company Logo" class="logo"/>
            <img src=${logo} alt="Company Logo" class="watermark" style="width: 400px; height: auto;"/>

            <h1>Invoice</h1>
            <div class="section">
                <h2>Invoice Details</h2>
                <p>Invoice Number: ${invoiceData.invoiceNumber}</p>
                <p>Date: ${invoiceData.date}</p>
                <p>Due Date: ${invoiceData.dueDate}</p>
            </div>
            <div class="section-bill-from">
                <h2>From</h2>
                <p>${invoiceData.companyName}</p>
                <p>${invoiceData.companyAddress}</p>
            </div>
            <div class="section-bill-gap"> <h2></h2> <p></p> </div>
            <div class="section-bill-to">
                <h2>Bill To</h2>
                <p>${invoiceData.clientName}</p>
                <p>${invoiceData.clientAddress}</p>
            </div>
            <div class="section section-item">
                <h2>Items</h2>
                <table>
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoiceData.items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>${invoiceData?.currency} ${item.price.toFixed(2)}</td>
                        <td class="text-right">${invoiceData?.currency} ${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                    `).join('')}
                </tbody>
                </table>
            </div>
            <div class="">
                <div class="section-total">
                    <p>Subtotal: ${invoiceData?.currency} ${calculateSubtotal().toFixed(2)}</p>
                    <p>Tax (10%): ${invoiceData?.currency} ${calculateTax().toFixed(2)}</p>
                    <p class="total">Total: ${invoiceData?.currency} ${calculateTotal().toFixed(2)}</p>
                </div>
                <div class="section">
                    <h2>Notes</h2>
                    <p>${invoiceData.notes}</p>
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); window.close(); }
            </script>
            </body>
        </html>
        `);


    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl font-bold mb-6 text-gray-800">Invoice</div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                    <input
                        type="text"
                        name="invoiceNumber"
                        value={invoiceData.invoiceNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="INV-001"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={invoiceData.date}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <div className="font-medium mb-2">From:</div>
                    <input
                        type="text"
                        name="companyName"
                        value={invoiceData.companyName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Your Company Name"
                    />
                    <textarea
                        name="companyAddress"
                        value={invoiceData.companyAddress}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="Your Company Address"
                        rows="3"
                    />
                </div>
                <div>
                    <div className="font-medium mb-2">Bill To:</div>
                    <input
                        type="text"
                        name="clientName"
                        value={invoiceData.clientName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Client Name"
                    />
                    <textarea
                        name="clientAddress"
                        value={invoiceData.clientAddress}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="Client Address"
                        rows="3"
                    />
                </div>
            </div>

            <div className="mb-6">
                <div className="font-medium mb-2">Items:</div>
                <div className="space-y-2">
                    {invoiceData.items.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                className="flex-grow p-2 border rounded"
                                placeholder="Item description"
                            />
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                className="w-24 p-2 border rounded"
                                min="1"
                            />
                            <input
                                type="number"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                className="w-32 p-2 border rounded"
                                min="0"
                                step="0.01"
                            />
                            <button
                                onClick={() => removeItem(index)}
                                className="p-2 text-red-600 hover:text-red-800"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addItem}
                    className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                    <Plus size={20} /> Add Item
                </button>
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-end space-y-2">
                    <div className="w-64">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>{invoiceData?.currency} {calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax (10%):</span>
                            <span>{invoiceData?.currency} {calculateTax().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>{invoiceData?.currency}{calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                    name="notes"
                    value={invoiceData.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Additional notes..."
                    rows="3"
                />
            </div>

            <button
                onClick={printInvoice}
                className="mt-6 bg-blue-500 text-white p-2 rounded"
            >
                Print Invoice
            </button>

        </div>
    );
};

export default InvoiceGenerator;