import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface WhatsAppStatus {
  isReady: boolean;
  hasQR: boolean;
  qrCode?: string;
}

const HomePage: React.FC = () => {
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWhatsAppStatus();
    const interval = setInterval(fetchWhatsAppStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchWhatsAppStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/whatsapp-web/status');
      const data = await response.json();
      
      if (data.success) {
        setWhatsappStatus(data.data);
      }
    } catch (err) {
      console.error('Error fetching WhatsApp status:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>WhatsApp Web - المساعد الذكي</title>
        <meta name="description" content="ربط WhatsApp مع المساعد الذكي" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#25D366', margin: 0, fontSize: '28px' }}>
            📱 WhatsApp Web - المساعد الذكي
          </h1>
          <p style={{ color: '#666', margin: '10px 0 0 0' }}>
            امسح الباركود لربط WhatsApp بالمساعد الذكي
          </p>
        </div>

        {/* Content */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {loading ? (
            <div>
              <div style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #25D366',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
              }}></div>
              <p style={{ color: '#666' }}>جاري التحقق من حالة WhatsApp Web...</p>
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            <div>
              {/* Status */}
              <div style={{
                backgroundColor: whatsappStatus?.isReady ? '#d4edda' : '#f8d7da',
                color: whatsappStatus?.isReady ? '#155724' : '#721c24',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {whatsappStatus?.isReady ? '✅ WhatsApp متصل' : '❌ WhatsApp غير متصل'}
              </div>

              {/* QR Code or Connected Message */}
              {whatsappStatus?.hasQR && whatsappStatus?.qrCode ? (
                <div>
                  <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '2px solid #ddd',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}>
                    <img 
                      src={whatsappStatus.qrCode} 
                      alt="WhatsApp QR Code" 
                      style={{ width: '300px', height: '300px' }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', direction: 'rtl', lineHeight: '1.8' }}>
                    <h3 style={{ color: '#25D366', marginBottom: '15px' }}>خطوات الربط:</h3>
                    <p>1. افتح تطبيق WhatsApp على هاتفك</p>
                    <p>2. اذهب إلى الإعدادات ← الأجهزة المرتبطة</p>
                    <p>3. اضغط على "ربط جهاز"</p>
                    <p>4. امسح الباركود أعلاه</p>
                  </div>
                </div>
              ) : whatsappStatus?.isReady ? (
                <div>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                  <h2 style={{ color: '#25D366', marginBottom: '10px' }}>
                    تم الاتصال بنجاح!
                  </h2>
                  <p style={{ color: '#666', fontSize: '16px' }}>
                    WhatsApp متصل الآن بالمساعد الذكي<br/>
                    سيتم الرد على الرسائل تلقائياً
                  </p>
                  
                  {/* Test Message Section */}
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '10px',
                    marginTop: '20px',
                    textAlign: 'right',
                    direction: 'rtl'
                  }}>
                    <h4 style={{ color: '#333', marginBottom: '10px' }}>💡 لاختبار المساعد الذكي:</h4>
                    <p style={{ margin: 0, color: '#666' }}>
                      أرسل رسالة إلى رقم WhatsApp المربوط وستحصل على رد تلقائي من المساعد الذكي
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>⏳</div>
                  <h3 style={{ color: '#666', marginBottom: '10px' }}>جاري التحضير...</h3>
                  <p style={{ color: '#666' }}>
                    انتظر قليلاً حتى يتم إنشاء رمز QR
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          color: '#666',
          fontSize: '14px'
        }}>
          <p>المساعد الذكي - مدعوم بتقنية OpenAI GPT</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
