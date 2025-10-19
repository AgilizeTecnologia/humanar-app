import React from 'react';

const CDCViewer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Código do Consumidor</h1>
          <div style={{ position: 'relative', paddingTop: 'max(60%,324px)', width: '100%', height: 0 }}>
            <iframe
              style={{ position: 'absolute', border: 'none', width: '100%', height: '100%', left: 0, top: 0 }}
              src="https://online.fliphtml5.com/agilizetecnologia/kuuh/"
              seamless="seamless"
              scrolling="no"
              frameBorder="0"
              allowTransparency="true"
              allowFullScreen="true"
              title="Código de Defesa do Consumidor - FlipHTML5"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDCViewer;

