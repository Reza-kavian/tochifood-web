////zare_nk_050124_okk
"use client"

import React, { useState, useRef, useEffect, MutableRefObject } from 'react';

function OtpInputForm() {
  const [otp, setOtp] = useState(['', '', '', '']);
  //// This useRef will hold an array of HTMLInputElement or null.
  //// We initialize it as an empty array.
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Use useEffect to focus the first input after the component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];

    // Handle pasting a full OTP code
    if (value.length > 1 && value.length !== 4) {
      const digits = value.split('').filter(char => char.match(/[0-9]/)).slice(0, 4); // Filter out non-digits and limit to 4
      digits.forEach((digit, i) => {
        if (index + i < 4) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus next input if applicable, or verify if it's the last digit
      if (digits.length === 4 && newOtp.every(d => d !== '')) {
        verifyOtp(newOtp.join(''));
      } else if (index + digits.length < 4 && digits.length > 0) {
        inputRefs.current[index + digits.length]?.focus();
      }
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Logic for moving focus
    if (value.length === 1 && index < 3) {
      // Move to the next input if a digit is entered
      inputRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      // Move to the previous input if the field is cleared using backspace
      inputRefs.current[index - 1]?.focus();
    }

    // Automatically submit if all fields are filled
    if (newOtp.every(digit => digit !== '') && index === 3) {
      const otpCode = newOtp.join('');
      verifyOtp(otpCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      // Move focus to the previous input when Backspace is pressed on an empty field
      inputRefs.current[index - 1]?.focus();
    } else if (e.key.length === 1 && e.key.match(/[0-9]/) && index === 3 && otp[3] !== '') {
      // If the last field is filled and a digit is pressed, attempt to verify
      const otpCode = [...otp.slice(0, 3), e.key].join('');
      verifyOtp(otpCode);
    }
  };

  const verifyOtp = async (otpCode: string) => {
    console.log(`Attempting to verify OTP: ${otpCode}`);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OTP verification failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      alert('OTP verified successfully!');

    } catch (error) {
      console.error('Error verifying OTP:', error); 

      let errorMessage = 'error in catch is: ';
      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
        alert(`OTP verification failed. Please check the code and try again. Error: ${error.message}`);
      } else {
        // اگر خطا یک شیء استاندارد Error نبود، خود خطا را به صورت رشته نمایش بده
        errorMessage += ` Error: ${String(error)}`;
        alert(`OTP verification failed. Please check the code and try again. Error: ${error}`);
      }

      // Reset OTP and focus the first input on error
      setOtp(['', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          // Use a callback ref to populate the inputRefs array
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
          }}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default OtpInputForm;
