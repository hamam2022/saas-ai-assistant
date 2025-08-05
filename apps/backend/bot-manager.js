const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002; // منفذ منفصل لإدارة البوت

app.use(cors());
app.use(express.json());

// API endpoint لحالة البوت
app.get('/api/bot/status', async (req, res) => {
  try {
    exec('pm2 jlist', (error, stdout, stderr) => {
      if (error) {
        return res.json({
          success: true,
          data: {
            status: 'offline',
            message: 'البوت متوقف',
            uptime: '--',
            memory: '--'
          }
        });
      }
      
      try {
        const processes = JSON.parse(stdout);
        const botProcess = processes.find(p => p.name === 'saas-ai-bot');
        
        if (botProcess && botProcess.pm2_env.status === 'online') {
          const uptime = Math.floor((Date.now() - botProcess.pm2_env.pm_uptime) / 1000) + ' ثانية';
          const memory = botProcess.monit ? Math.round(botProcess.monit.memory / 1024 / 1024) + ' MB' : '--';
          
          res.json({
            success: true,
            data: {
              status: 'online',
              message: 'البوت يعمل بنجاح',
              uptime: uptime,
              memory: memory,
              restarts: botProcess.pm2_env.restart_time || 0
            }
          });
        } else {
          res.json({
            success: true,
            data: {
              status: 'offline',
              message: 'البوت متوقف',
              uptime: '--',
              memory: '--'
            }
          });
        }
      } catch (parseError) {
        res.json({
          success: true,
          data: {
            status: 'offline',
            message: 'خطأ في قراءة حالة البوت',
            uptime: '--',
            memory: '--'
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'فشل في جلب حالة البوت', status: 500 }
    });
  }
});

// API endpoint لتشغيل البوت
app.post('/api/bot/start', async (req, res) => {
  try {
    exec('cd c:\\saas-ai-assistant\\apps\\backend && pm2 start simple-server.js --name "saas-ai-bot"', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          success: false,
          error: { message: 'فشل في تشغيل البوت: ' + error.message, status: 500 }
        });
      }
      
      res.json({
        success: true,
        message: 'تم تشغيل البوت بنجاح'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'خطأ في تشغيل البوت', status: 500 }
    });
  }
});

// API endpoint لإيقاف البوت
app.post('/api/bot/stop', async (req, res) => {
  try {
    exec('pm2 stop saas-ai-bot', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          success: false,
          error: { message: 'فشل في إيقاف البوت: ' + error.message, status: 500 }
        });
      }
      
      res.json({
        success: true,
        message: 'تم إيقاف البوت بنجاح'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'خطأ في إيقاف البوت', status: 500 }
    });
  }
});

// API endpoint لإعادة تشغيل البوت
app.post('/api/bot/restart', async (req, res) => {
  try {
    exec('pm2 restart saas-ai-bot', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          success: false,
          error: { message: 'فشل في إعادة تشغيل البوت: ' + error.message, status: 500 }
        });
      }
      
      res.json({
        success: true,
        message: 'تم إعادة تشغيل البوت بنجاح'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'خطأ في إعادة تشغيل البوت', status: 500 }
    });
  }
});

// API endpoint للسجلات
app.get('/api/bot/logs', async (req, res) => {
  try {
    exec('pm2 logs saas-ai-bot --lines 20 --nostream', (error, stdout, stderr) => {
      if (error) {
        return res.json({
          success: true,
          data: { logs: 'لا توجد سجلات متاحة' }
        });
      }
      
      res.json({
        success: true,
        data: { logs: stdout || 'لا توجد سجلات' }
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'فشل في جلب السجلات', status: 500 }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎛️ Bot Manager running on port ${PORT}`);
});

module.exports = app;
