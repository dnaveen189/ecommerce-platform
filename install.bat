@echo off
cd /d C:\Users\LENOVO\Desktop\ecommerce-platform
echo Installing root dependencies...
npm install
echo.
echo Installing server dependencies...
cd server
call npm install
cd ..
echo.
echo Installing client dependencies...
cd client
call npm install
cd ..
echo.
echo =============================================
echo   Installation Complete!
echo =============================================
echo.
echo To run the application:
echo   1. Make sure MongoDB is running
echo   2. Double-click run.bat
echo.
pause

