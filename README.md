# Base64 to ASCII Converter

![Base64 Converter](https://img.shields.io/badge/Base64-Converter-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

A web-based tool that converts Base64 encoded strings to ASCII text, specifically designed to handle SQL Server binary/version identifiers and other structured data formats.

## Features

- **Base64 Decoding**: Convert Base64 strings to ASCII text
- **Null Byte Filtering**: Automatically removes null bytes (like PowerShell's `.Replace("`0", "")`)
- **Byte Analysis**: Displays 4-byte groups with little-endian integer conversions
- **SQL-Specific Handling**: Optimized for decoding SQL Server binary data formats
- **Real-time Statistics**: Shows byte counts, null bytes, and printable characters
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Built with Bootstrap 5 for a professional look

## Live Demo

[Try it here!](#) *(https://borsimir.github.io/DecodeBase64/)*

## Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Custom styling and animations
- **Bootstrap 5.3.0** - Responsive framework
- **JavaScript (ES6)** - Core functionality
- **Bootstrap Icons** - Icon set

## What This Tool Is For

This web application is specifically designed to decode Base64 strings that are commonly found in:

### SQL Server Context
- **SQL Server version/build identifiers** (e.g., `IkRlY29kZSB0aGUgQmFzZTY0Ig==`)
- **Database metadata and headers**
- **Replication/AlwaysOn configuration data**
- **System table binary data**
- **SQL Agent job configuration**
- **Database compatibility information**

### Other Use Cases
- Decoding Base64-encoded binary data
- Analyzing byte structures in 4-byte groups
- Converting encoded strings to readable ASCII
- Educational tool for understanding Base64 encoding

## How It Works

The tool mimics PowerShell's Base64 decoding behavior:

```powershell
# PowerShell equivalent:
$base64 = "IkRlY29kZSB0aGUgQmFzZTY0Ig=="
$bytes = [Convert]::FromBase64String($base64)
$ascii = [System.Text.Encoding]::ASCII.GetString($bytes).Replace("`0", "")
