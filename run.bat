@echo off
echo ==============================================
echo   ShopSmart E-Commerce Platform
echo ==============================================
echo.
echo Starting the development servers...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Starting server...
start "Server" cmd /k "cd /d C:\Users\LENOVO\Desktop\ecommerce-platform\server && npm run dev"
timeout /t 3 /nobreak >nul
echo Starting client...
start "Client" cmd /k "cd /d C:\Users\LENOVO\Desktop\ecommerce-platform\client && npm run dev"
echo.
echo Servers started! Enjoy shopping at ShopSmart!
echo.
pause

