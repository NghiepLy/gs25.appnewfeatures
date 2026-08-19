Add-Type -AssemblyName System.Drawing
$pngPath = "C:\Users\LYVINGHIEP\Documents\CRM Loyalty Build New Features\LOYALTY APP (5).png"
$jpgPath = "C:\Users\LYVINGHIEP\Documents\CRM Loyalty Build New Features\loyalty_app_5.jpg"

$stream = New-Object System.IO.FileStream($pngPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read)
$bmp = [System.Drawing.Image]::FromStream($stream)
$bmp.Save($jpgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
$stream.Close()

Write-Host "Success converting $pngPath to $jpgPath"
