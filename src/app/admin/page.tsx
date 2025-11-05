'use client';

import React, { useState } from 'react';

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null)

const handleFileSelect = (selectedFile: File) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!validTypes.includes(selectedFile.type) && 
        !selectedFile.name.endsWith('.xlsx') && 
        !selectedFile.name.endsWith('.xls') && 
        !selectedFile.name.endsWith('.csv')) {
      setResult({
        success: false,
        message: 'Please upload a valid Excel (.xlsx, .xls) or CSV file'
      });
      return;
    }
    
    setFile(selectedFile);
    setResult(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setResult({
        success: false,
        message: 'Please select a file first'
      });
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-excel', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: 'Excel data uploaded successfully!',
          recordsInserted: data.recordsInserted,
          recordsUpdated: data.recordsUpdated,
          errors: data.errors
        });
        setFile(null);
      } else {
        setResult({
          success: false,
          message: data.error || 'Upload failed'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Upload failed: ' + (error as Error).message
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            Admin Upload Portal
          </h1>
          <p className="text-purple-200 text-lg">
            Upload Excel file to populate BC Master Database
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          
          <div className="border-4 border-dashed border-white/30 rounded-2xl p-12 text-center bg-white/5">
            <input
              type="file"
              id="fileInput"
              onChange={handleFileInput}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            
            {!file ? (
              <>
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Drop your Excel file here
                </h3>
                <p className="text-white/60 mb-6">
                  or click to browse
                </p>
                <label
                  htmlFor="fileInput"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl cursor-pointer transition-all transform hover:scale-105 shadow-lg"
                >
                  Choose File
                </label>
                <p className="text-white/40 text-sm mt-4">
                  Supported formats: .xlsx, .xls, .csv
                </p>
              </>
            ) : (
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-white font-semibold text-lg mb-1">
                  {file.name}
                </p>
                <p className="text-white/60 text-sm mb-4">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Remove file
                </button>
              </div>
            )}
          </div>

          {result && (
            <div className={`mt-8 p-6 rounded-2xl border-2 ${
              result.success 
                ? 'bg-green-500/20 border-green-400' 
                : 'bg-red-500/20 border-red-400'
            }`}>
              <h4 className={`font-bold text-lg mb-2 ${
                result.success ? 'text-green-300' : 'text-red-300'
              }`}>
                {result.success ? 'Success!' : 'Error'}
              </h4>
              <p className="text-white mb-3">{result.message}</p>
              
              {result.success && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-white/60 text-sm">Inserted</p>
                    <p className="text-white font-bold text-xl">
                      {result.recordsInserted}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-white/60 text-sm">Updated</p>
                    <p className="text-white font-bold text-xl">
                      {result.recordsUpdated}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-white/60 text-sm">Errors</p>
                    <p className="text-white font-bold text-xl">
                      {result.errors}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full mt-8 px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl"
          >
            {uploading ? 'Processing...' : 'Upload to Database'}
          </button>

          <div className="mt-8 p-6 bg-blue-500/20 rounded-xl border border-blue-400/30">
            <h4 className="text-white font-bold text-lg mb-3">
              Excel File Requirements
            </h4>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>• First row must contain column headers</li>
              <li>• Required columns: BC_CODE, NAME</li>
              <li>• Optional: ADDRESS, CITY, STATE, MOBILE, ALT_MOBILE, VILLAGE, TALUKA, DISTRICT, PINCODE</li>
              <li>• BC_CODE must be unique</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}