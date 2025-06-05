// SheetDB API Integration
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/lj89b6eyqk61a';

// Function to store form data with transaction ID
async function storeFormData(formData) {
    try {
        // Log the data being sent
        console.log('Sending data to SheetDB:', formData);

        const data = {
            name: formData.name,
            roll_number: formData.rollNumber,
            marks: formData.marks,
            aadhar: formData.aadhar,
            mobile: formData.mobile,
            email: formData.email,
            state: formData.state,
            address: formData.address,
            timestamp: new Date().toISOString(),
            transaction_id: formData.transactionId
        };

        // Log the formatted data
        console.log('Formatted data for SheetDB:', data);

        const response = await fetch(SHEETDB_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: [data] })
        });

        // Log the response
        console.log('SheetDB Response:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('SheetDB Error Response:', errorText);
            throw new Error(`Failed to store data: ${errorText}`);
        }

        const result = await response.json();
        console.log('Data stored successfully:', result);
        return true;
    } catch (error) {
        console.error('Error storing data:', error);
        return false;
    }
}

// Function to update transaction ID
async function updateTransactionId(transactionId) {
    try {
        // Get the row index from localStorage
        const rowIndex = localStorage.getItem('lastRowIndex');
        if (!rowIndex) {
            throw new Error('No row index found');
        }

        const response = await fetch(`${SHEETDB_API_URL}/id/${rowIndex}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    transaction_id: transactionId
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update transaction ID');
        }

        const result = await response.json();
        console.log('Transaction ID updated successfully:', result);
        return true;
    } catch (error) {
        console.error('Error updating transaction ID:', error);
        return false;
    }
}

// Export functions for use in other files
window.googleSheets = {
    storeData: storeFormData,
    updateTransactionId: updateTransactionId
}; 