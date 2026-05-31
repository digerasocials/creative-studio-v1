@echo off
title Creative Studio - Update Website Gallery
echo ==============================================================
echo SCANNINIG AND INDEXING WEBSITE GALLERY ASSETS...
echo ==============================================================
python "%~dp0update_gallery.py"
if %errorlevel% neq 0 (
    echo.
    echo Something went wrong. Make sure Python is installed on your system.
)
echo.
pause
