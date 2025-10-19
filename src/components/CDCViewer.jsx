import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const CDCViewer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Código de Defesa do Consumidor
                </h1>
                <p className="text-sm text-gray-600">Lei nº 8.078, de 11 de setembro de 1990</p>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div style={{position:'relative',paddingTop:'max(60%,324px)',width:'100%',height:0}}>
            <iframe style={{position:'absolute',border:'none',width:'100%',height:'100%',left:0,top:0}} src="https://online.fliphtml5.com/agilizetecnologia/kuuh/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDCViewer;

