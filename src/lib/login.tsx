"use server";

export const authenticate = async (values: any) => {
    try {
        const response = await fetch('/api/sendpasscode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: values.email }),
        });
        console.log(response);
        if (response.ok) {
            return response.ok;
            // setSuccess(true);
            // setIsWaitingCode(true);
        } else {
            const data = await response.json();
            throw new Error(data.message || "Something went wrong.");
        }
    } catch (error) {
        // throw new Error("Failed to send email. Please try again.");
    }
};