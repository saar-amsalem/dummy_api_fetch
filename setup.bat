@echo off
setlocal

echo Cloning the repository...
git clone https://github.com/saar-amsalem/dummy_api_fetch.git
echo clone done !

cd dummy_api_fetch

echo in dummy_api_fetch

echo Creating virtual environment...
%PYTHON_PATH% -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

echo Running Flask application...
start /b python app.py
timeout /t 5 /nobreak

echo Opening the application in the default web browser...
start http://localhost:5000

echo Press any key to exit...
pause

endlocal
