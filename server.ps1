$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

function ProcessRequest($context) {
    try {
        $request = $context.Request
        $response = $context.Response
        
        $localPath = [System.Web.HttpUtility]::UrlDecode($request.Url.LocalPath)
        if ($localPath -eq "/") { $localPath = "/index.html" }
        
        $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Flush()
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # ignore context errors
    }
}

while ($listener.IsListening) {
    $contextTask = $listener.GetContextAsync()
    while (-not $contextTask.AsyncWaitHandle.WaitOne(100)) {
        # keep-alive loop
    }
    if ($contextTask.IsCompleted) {
        $context = $contextTask.Result
        ProcessRequest $context
    }
}
