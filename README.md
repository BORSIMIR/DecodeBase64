Base64 to ASCII Converter
https://img.shields.io/badge/Base64-Converter-blue
https://img.shields.io/badge/Bootstrap-5.3.0-purple
https://img.shields.io/badge/JavaScript-ES6-yellow
https://img.shields.io/badge/License-MIT-green

A web-based tool that converts Base64 encoded strings to ASCII text, specifically designed to handle SQL Server binary/version identifiers and other structured data formats.

🌟 Features
Base64 Decoding: Convert Base64 strings to ASCII text

Null Byte Filtering: Automatically removes null bytes (like PowerShell's .Replace("0", "")`)

Byte Analysis: Displays 4-byte groups with little-endian integer conversions

SQL-Specific Handling: Optimized for decoding SQL Server binary data formats

Real-time Statistics: Shows byte counts, null bytes, and printable characters

Responsive Design: Works on desktop and mobile devices

Clean UI: Built with Bootstrap 5 for a professional look

🚀 Live Demo
Try it here! (Add your deployment link here)

🛠️ Technologies Used
HTML5 - Structure and semantics

CSS3 - Custom styling and animations

Bootstrap 5.3.0 - Responsive framework

JavaScript (ES6) - Core functionality

Bootstrap Icons - Icon set

📖 What This Tool Is For
This web application is specifically designed to decode Base64 strings that are commonly found in:

🔍 SQL Server Context
SQL Server version/build identifiers (e.g., agAAAHMAAAAwAAAAMAAAADQAAAAwAAAAMQAAADQAAAA=)

Database metadata and headers

Replication/AlwaysOn configuration data

System table binary data

SQL Agent job configuration

Database compatibility information

💡 Other Use Cases
Decoding Base64-encoded binary data

Analyzing byte structures in 4-byte groups

Converting encoded strings to readable ASCII

Educational tool for understanding Base64 encoding

🎯 How It Works
The tool mimics PowerShell's Base64 decoding behavior:

powershell
# PowerShell equivalent:
$base64 = "agAAAHMAAAAwAAAAMAAAADQAAAAwAAAAMQAAADQAAAA="
$bytes = [Convert]::FromBase64String($base64)
$ascii = [System.Text.Encoding]::ASCII.GetString($bytes).Replace("`0", "")
Key Processing:

Decodes Base64 string to binary

Converts bytes to ASCII characters

Removes null bytes (0x00)

Groups bytes in 4-byte chunks for analysis

Converts to little-endian 32-bit integers

Displays readable results

📱 How to Use
Basic Usage
Enter Base64 String

Paste your Base64 encoded string in the input field

Example: agAAAHMAAAAwAAAAMAAAADQAAAAwAAAAMQAAADQAAAA=

Click "Convert"

Press the Convert button or hit Enter

The tool will decode and analyze the string

View Results in Tabs

ASCII Result: Shows decoded text without null bytes

Byte Analysis: Shows 4-byte groups with integer values

Details: Displays conversion statistics

Example SQL Server Decoding
Input:

text
agAAAHMAAAAwAAAAMAAAADQAAAAwAAAAMQAAADQAAAA=
Output:

ASCII Result: js004014

Interpretation: Likely SQL Server version/build identifier

Understanding the Output:

Each character represents a version component

Null bytes are filtered out (common in SQL binary data)

The pattern suggests SQL Server build information

Advanced Features
Quick Examples: Click "Example 1" to load a sample SQL Server identifier

Clear Input: Reset the form with one click

Keyboard Support: Press Enter to convert

Visual Feedback: Animated results and color-coded bytes

📊 Understanding the Output
ASCII Result Tab
Decoded the Base64: Final ASCII string without null bytes

Full ASCII: Shows all characters with null bytes represented as ·

Byte Analysis Tab
4-byte Groups: Displays bytes in little-endian format

Integer Values: Shows 32-bit integer conversion

Character Representation: Displays the ASCII character for each first byte

Details Tab
Total Bytes: Number of bytes in the decoded data

Null Bytes: Count of null (0x00) bytes

Printable Bytes: Count of printable ASCII characters

String Length: Length of the final ASCII string
