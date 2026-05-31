@echo off
title Creative Studio - Compress Portfolio Images
echo ==============================================================
echo STARTING WEBSITE PORTFOLIO IMAGE COMPRESSOR...
echo ==============================================================
python "%~dp0compress_images.py"
if %errorlevel% neq 0 (
    echo.
    echo Something went wrong. Make sure Python is installed on your system.
)
echo.
pause
